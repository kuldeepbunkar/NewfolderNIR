const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const cloudinary = require('../config/cloudinary');

class BackupService {
  constructor() {
    this.backupDir = path.join(__dirname, '../../backups');
  }

  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.gz`;
    const filepath = path.join(this.backupDir, filename);

    try {
      // Create backup directory if it doesn't exist
      await fs.mkdir(this.backupDir, { recursive: true });

      // Create MongoDB dump
      await new Promise((resolve, reject) => {
        exec(
          `mongodump --uri="${process.env.MONGODB_URI}" --archive="${filepath}" --gzip`,
          (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve(stdout);
          }
        );
      });

      // Upload to cloud storage
      const result = await cloudinary.uploader.upload(filepath, {
        resource_type: 'raw',
        folder: 'backups',
        public_id: filename
      });

      // Delete local file
      await fs.unlink(filepath);

      return {
        filename,
        url: result.secure_url,
        size: result.bytes,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Backup failed:', error);
      throw error;
    }
  }

  async restoreBackup(backupUrl) {
    const filepath = path.join(this.backupDir, 'temp-restore.gz');

    try {
      // Download backup file
      const response = await fetch(backupUrl);
      const buffer = await response.buffer();
      await fs.writeFile(filepath, buffer);

      // Restore MongoDB dump
      await new Promise((resolve, reject) => {
        exec(
          `mongorestore --uri="${process.env.MONGODB_URI}" --archive="${filepath}" --gzip`,
          (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve(stdout);
          }
        );
      });

      // Delete temporary file
      await fs.unlink(filepath);

      return true;
    } catch (error) {
      console.error('Restore failed:', error);
      throw error;
    }
  }
}

module.exports = new BackupService(); 