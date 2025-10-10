import React, { useState } from 'react';
import './TaskForm.css';

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
    <div className="task-form-container">
      <h2>Добавить новую задачу</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок задачи"
            disabled={isSubmitting}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание задачи (необязательно)"
            rows="3"
            disabled={isSubmitting}
            className="form-textarea"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || !title.trim()}
          className="submit-button"
        >
          {isSubmitting ? 'Добавление...' : 'Добавить задачу'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
