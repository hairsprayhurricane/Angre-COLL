import React, { useState } from 'react';
import './TaskItem.css';

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
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-input"
              placeholder="Заголовок задачи"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-textarea"
              placeholder="Описание задачи"
              rows="2"
            />
          </div>
          <div className="edit-actions">
            <button 
              onClick={handleSave} 
              disabled={isUpdating}
              className="save-button"
            >
              {isUpdating ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button 
              onClick={handleCancel}
              disabled={isUpdating}
              className="cancel-button"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-content">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-date">
                Создано: {formatDate(task.createdAt)}
              </span>
              {task.updatedAt && task.updatedAt !== task.createdAt && (
                <span className="task-date">
                  Обновлено: {formatDate(task.updatedAt)}
                </span>
              )}
            </div>
          </div>
          
          <div className="task-actions">
            <div className="status-section">
              <label className="status-label">Статус:</label>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdating}
                className="status-select"
              >
                <option value="In Process">В процессе</option>
                <option value="Completed">Завершено</option>
              </select>
            </div>
            
            <div className="action-buttons">
              <button 
                onClick={handleEdit}
                disabled={isUpdating}
                className="edit-button"
                title="Редактировать"
              >
                ✏️
              </button>
              <button 
                onClick={handleDelete}
                disabled={isUpdating}
                className="delete-button"
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
