import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import { useNotification } from '../../../hooks/useNotification';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`
  padding: 2rem;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: 2rem;
`;

const TemplateHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditorContainer = styled.div`
  padding: 1.5rem;

  .ql-editor {
    min-height: 200px;
  }
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

function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await apiMethods.getEmailTemplates();
      setTemplates(response.data);
    } catch (error) {
      addNotification('Failed to fetch templates', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (templateId, content) => {
    try {
      await apiMethods.updateEmailTemplate(templateId, { content });
      addNotification('Template updated successfully', 'success');
    } catch (error) {
      addNotification('Failed to update template', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Email Templates</h2>
      {templates.map(template => (
        <TemplateCard key={template.id}>
          <TemplateHeader>
            <h3>{template.name}</h3>
            <Button onClick={() => handleSave(template.id, template.content)}>
              Save Changes
            </Button>
          </TemplateHeader>
          <EditorContainer>
            <ReactQuill
              value={template.content}
              onChange={content => {
                const updatedTemplates = templates.map(t =>
                  t.id === template.id ? { ...t, content } : t
                );
                setTemplates(updatedTemplates);
              }}
            />
          </EditorContainer>
        </TemplateCard>
      ))}
    </Container>
  );
}

export default EmailTemplates; 