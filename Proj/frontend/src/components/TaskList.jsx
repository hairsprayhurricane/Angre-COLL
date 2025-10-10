import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, loading, onUpdateTask, onDeleteTask }) => {
  if (loading) {
    return (
      <div className="task-list-container">
        <h2>Список задач</h2>
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка задач...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <h2>Список задач</h2>
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>Нет задач</h3>
          <p>Добавьте первую задачу, используя форму выше</p>
        </div>
      </div>
    );
  }

  // Подсчет задач по статусам
  const taskStats = tasks.reduce((stats, task) => {
    stats[task.status] = (stats[task.status] || 0) + 1;
    return stats;
  }, {});

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Список задач ({tasks.length})</h2>
        <div className="task-stats">
          <span className="stat-item">
            <span className="stat-number">{taskStats['In Process'] || 0}</span>
            <span className="stat-label">В процессе</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">{taskStats['Completed'] || 0}</span>
            <span className="stat-label">Завершено</span>
          </span>
        </div>
      </div>
      
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
