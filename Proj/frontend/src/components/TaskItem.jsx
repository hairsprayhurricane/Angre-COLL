import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const TaskItemContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => 
    props.$status === 'Completed' ? '#28a745' : 
    props.$status === 'In Process' ? '#17a2b8' : '#6c757d'};
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const TaskTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  opacity: ${props => props.$completed ? 0.7 : 1};
`;

const TaskDescription = styled.p`
  color: #6c757d;
  margin: 8px 0 15px;
  line-height: 1.5;
`;

const TaskMeta = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EditButton = styled(Button)`
  background-color: #ffc107;
  color: #212529;
  
  &:hover:not(:disabled) {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #c82333;
  }
`;

const SaveButton = styled(Button)`
  background-color: #28a745;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #218838;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #5a6268;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${props => 
    props.$status === 'Completed' ? '#d4edda' : 
    props.$status === 'In Process' ? '#d1ecf1' : '#e2e3e5'};
  color: ${props => 
    props.$status === 'Completed' ? '#155724' : 
    props.$status === 'In Process' ? '#0c5460' : '#383d41'};
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
`;

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await onUpdateTask(task.id, { status: newStatus });
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert('Заголовок не может быть пустым');
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdateTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка при сохранении изменений:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      try {
        await onDeleteTask(task.id);
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('ru-RU', options);
  };

  return (
    <TaskItemContainer $status={task.status}>
      {isEditing ? (
        <div>
          <EditInput
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Заголовок задачи"
          />
          <EditTextarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Описание задачи"
          />
          <ButtonGroup>
            <SaveButton 
              onClick={handleSave} 
              disabled={isUpdating}
            >
              {isUpdating ? 'Сохранение...' : 'Сохранить'}
            </SaveButton>
            <CancelButton
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Отмена
            </CancelButton>
          </ButtonGroup>
        </div>
      ) : (
        <>
          <TaskHeader>
            <TaskTitle $completed={task.status === 'Completed'}>
              {task.title}
            </TaskTitle>
            <StatusBadge $status={task.status}>
              {task.status === 'In Process' ? 'В процессе' : 
               task.status === 'Completed' ? 'Завершена' : 'Не начата'}
            </StatusBadge>
          </TaskHeader>
          
          {task.description && (
            <TaskDescription>{task.description}</TaskDescription>
          )}
          
          <TaskMeta>
            <span>Создано: {formatDate(task.createdAt)}</span>
            <span>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdating}
                style={{
                  padding: '2px 5px',
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                  fontSize: '0.8rem',
                  backgroundColor: 'white',
                  cursor: isUpdating ? 'not-allowed' : 'pointer'
                }}
              >
                <option value="Not Started">Не начата</option>
                <option value="In Process">В процессе</option>
                <option value="Completed">Завершена</option>
              </select>
            </span>
          </TaskMeta>
          
          <ButtonGroup>
            <EditButton 
              onClick={handleEdit}
              disabled={isUpdating}
            >
              Редактировать
            </EditButton>
            <DeleteButton 
              onClick={handleDelete}
              disabled={isUpdating}
            >
              Удалить
            </DeleteButton>
          </ButtonGroup>
        </>
      )}
    </TaskItemContainer>
  );
};

export default TaskItem;
