import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import { useNotification } from '../../../context/NotificationContext';
import { formatDateTime, formatBytes } from '../../../utils/formatters';

const Container = styled.div`
  padding: 2rem;
`;

const BackupGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const BackupCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const BackupList = styled.div`
  margin-top: 1.5rem;
`;

const BackupItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.variant === 'danger' ? props.theme.colors.error : props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

function BackupRestore() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

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
    try {
      await apiMethods.createBackup();
      addNotification('Backup created successfully', 'success');
      fetchBackups();
    } catch (error) {
      addNotification('Failed to create backup', 'error');
    }
  };

  const handleRestore = async (backupId) => {
    if (window.confirm('Are you sure you want to restore this backup? This will override current data.')) {
      try {
        await apiMethods.restoreBackup(backupId);
        addNotification('System restored successfully', 'success');
      } catch (error) {
        addNotification('Failed to restore system', 'error');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>System Backup & Restore</h2>
      <BackupGrid>
        <BackupCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Available Backups</h3>
            <Button onClick={handleCreateBackup}>Create Backup</Button>
          </div>
          <BackupList>
            {backups.map(backup => (
              <BackupItem key={backup.id}>
                <div>
                  <div>{formatDateTime(backup.createdAt)}</div>
                  <div>Size: {formatBytes(backup.size)}</div>
                </div>
                <Button onClick={() => handleRestore(backup.id)}>
                  Restore
                </Button>
                <Button variant="danger" onClick={() => handleDeleteBackup(backup.id)}>
                  Delete
                </Button>
              </BackupItem>
            ))}
          </BackupList>
        </BackupCard>
      </BackupGrid>
    </Container>
  );
}

export default BackupRestore; 