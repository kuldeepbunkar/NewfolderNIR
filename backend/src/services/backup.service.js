const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const AWS = require('aws-sdk');
const logger = require('../config/logger');

class BackupService {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    this.backupBucket = process.env.AWS_BACKUP_BUCKET;
  }

  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.gz`;
    const filepath = path.join(__dirname, `../../backups/${filename}`);

    try {
      // Create MongoDB dump
      await this.createMongoDBDump(filepath);

      // Upload to S3
      await this.uploadToS3(filepath, filename);

      // Cleanup local file
      await fs.unlink(filepath);

      logger.info(`Backup created successfully: ${filename}`);
      return { filename, timestamp };
    } catch (error) {
      logger.error('Backup creation failed:', error);
      throw error;
    }
  }

  async restoreBackup(filename) {
    const filepath = path.join(__dirname, `../../backups/temp-${filename}`);

    try {
      // Download from S3
      await this.downloadFromS3(filename, filepath);

      // Restore MongoDB dump
      await this.restoreMongoDBDump(filepath);

      // Cleanup
      await fs.unlink(filepath);

      logger.info(`Backup restored successfully: ${filename}`);
      return true;
    } catch (error) {
      logger.error('Backup restoration failed:', error);
      throw error;
    }
  }

  async createMongoDBDump(filepath) {
    return new Promise((resolve, reject) => {
      exec(
        `mongodump --uri="${process.env.MONGODB_URI}" --archive="${filepath}" --gzip`,
        (error, stdout, stderr) => {
          if (error) reject(error);
          else resolve(stdout);
        }
      );
    });
  }

  async uploadToS3(filepath, filename) {
    const fileContent = await fs.readFile(filepath);
    await this.s3.upload({
      Bucket: this.backupBucket,
      Key: filename,
      Body: fileContent
    }).promise();
  }

  async downloadFromS3(filename, filepath) {
    const response = await this.s3.getObject({
      Bucket: this.backupBucket,
      Key: filename
    }).promise();

    await fs.writeFile(filepath, response.Body);
  }

  async restoreMongoDBDump(filepath) {
    return new Promise((resolve, reject) => {
      exec(
        `mongorestore --uri="${process.env.MONGODB_URI}" --archive="${filepath}" --gzip`,
        (error, stdout, stderr) => {
          if (error) reject(error);
          else resolve(stdout);
        }
      );
    });
  }
}

module.exports = new BackupService(); 