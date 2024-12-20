import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../utils/api';
import { formatDateTime, formatBytes } from '../../utils/formatters';

const Container = styled.div`
  padding: 2rem;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BackupList = styled.div`
  margin-top: 2rem;
`;

const BackupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

function BackupRestore() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [restoreInProgress, setRestoreInProgress] = useState(false);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const response = await apiMethods.getBackups();
      setBackups(response.data);
    } catch (error) {
      console.error('Failed to fetch backups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    setBackupInProgress(true);
    try {
      await apiMethods.createBackup();
      await fetchBackups();
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setBackupInProgress(false);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    if (window.confirm('Are you sure you want to restore this backup? This will override current data.')) {
      setRestoreInProgress(true);
      try {
        await apiMethods.restoreBackup(backupId);
      } catch (error) {
        console.error('Restore failed:', error);
      } finally {
        setRestoreInProgress(false);
      }
    }
  };

  const handleDeleteBackup = async (backupId) => {
    if (window.confirm('Are you sure you want to delete this backup?')) {
      try {
        await apiMethods.deleteBackup(backupId);
        await fetchBackups();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Backup & Restore</h2>

      <ActionGrid>
        <Card>
          <h3>Create Backup</h3>
          <p>Create a new backup of all system data</p>
          <Button 
            onClick={handleCreateBackup}
            disabled={backupInProgress}
          >
            {backupInProgress ? 'Creating Backup...' : 'Create Backup'}
          </Button>
        </Card>

        <Card>
          <h3>Auto Backup Settings</h3>
          <div>
            <label>
              <input type="checkbox" /> Enable Daily Backups
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" /> Enable Weekly Backups
            </label>
          </div>
        </Card>
      </ActionGrid>

      <Card>
        <h3>Available Backups</h3>
        <BackupList>
          {backups.map(backup => (
            <BackupItem key={backup._id}>
              <div>
                <div><strong>{formatDateTime(backup.createdAt)}</strong></div>
                <div>Size: {formatBytes(backup.size)}</div>
              </div>
              <div>
                <Button 
                  onClick={() => handleRestoreBackup(backup._id)}
                  disabled={restoreInProgress}
                >
                  Restore
                </Button>
                <Button 
                  onClick={() => handleDeleteBackup(backup._id)}
                  style={{ marginLeft: '1rem', background: 'red' }}
                >
                  Delete
                </Button>
              </div>
            </BackupItem>
          ))}
        </BackupList>
      </Card>
    </Container>
  );
}

export default BackupRestore; 