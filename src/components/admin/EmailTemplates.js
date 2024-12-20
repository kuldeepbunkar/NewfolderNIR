import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../utils/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`
  padding: 2rem;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
`;

const TemplateList = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const TemplateItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.background.light : 'white'};

  &:hover {
    background: ${props => props.theme.colors.background.light};
  }
`;

const EditorContainer = styled.div`
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
  margin-top: 1rem;
`;

function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await apiMethods.getEmailTemplates();
      setTemplates(response.data);
      if (response.data.length > 0) {
        setSelectedTemplate(response.data[0]);
        setContent(response.data[0].content);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await apiMethods.updateEmailTemplate(selectedTemplate._id, {
        ...selectedTemplate,
        content
      });
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  const handlePreview = () => {
    window.open(`/api/email-templates/${selectedTemplate._id}/preview`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Email Templates</h2>

      <TemplateGrid>
        <TemplateList>
          {templates.map(template => (
            <TemplateItem
              key={template._id}
              active={selectedTemplate?._id === template._id}
              onClick={() => {
                setSelectedTemplate(template);
                setContent(template.content);
              }}
            >
              {template.name}
            </TemplateItem>
          ))}
        </TemplateList>

        {selectedTemplate && (
          <EditorContainer>
            <h3>{selectedTemplate.name}</h3>
            <p>Subject: {selectedTemplate.subject}</p>
            
            <div style={{ marginTop: '1rem' }}>
              <label>Template Content:</label>
              <ReactQuill
                value={content}
                onChange={setContent}
                style={{ height: '400px', marginBottom: '4rem' }}
              />
            </div>

            <div>
              <Button onClick={handleSave}>Save Changes</Button>
              <Button 
                onClick={handlePreview}
                style={{ marginLeft: '1rem', background: '#666' }}
              >
                Preview
              </Button>
            </div>
          </EditorContainer>
        )}
      </TemplateGrid>
    </Container>
  );
}

export default EmailTemplates; 