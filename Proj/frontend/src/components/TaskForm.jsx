import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FormLabel = styled.label`
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
`;

const FormInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
  }
`;

const FormTextarea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: inherit;
  
  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  margin-top: 10px;
  
  &:hover:not(:disabled) {
    background-color: #218838;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
  }
`;

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Пожалуйста, введите заголовок задачи');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAddTask({
        title: title.trim(),
        description: description.trim()
      });
      
      // Очистить форму после успешного добавления
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Добавить новую задачу</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="title">Заголовок *</FormLabel>
          <FormInput
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок задачи"
            disabled={isSubmitting}
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="description">Описание</FormLabel>
          <FormTextarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание задачи (необязательно)"
            disabled={isSubmitting}
          />
        </FormGroup>
        
        <SubmitButton 
          type="submit" 
          disabled={isSubmitting || !title.trim()}
        >
          {isSubmitting ? 'Добавление...' : 'Добавить задачу'}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default TaskForm;
