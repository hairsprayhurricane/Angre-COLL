import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TaskItem from './TaskItem';

// Styled Components
const TaskListContainer = styled.div`
  margin-top: 20px;
`;

const TaskListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

const TaskStats = styled.div`
  display: flex;
  gap: 20px;
  background: #f8f9fa;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const StatItem = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  
  &:not(:last-child) {
    border-right: 1px solid #dee2e6;
    padding-right: 20px;
  }
`;

const StatNumber = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.span`
  font-size: 0.85rem;
  color: #6c757d;
  margin-top: 5px;
`;

const AddTaskButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  margin-bottom: 20px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #218838;
    color: white;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto 15px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 20px;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`;

const TaskList = ({ tasks, loading, onUpdateTask, onDeleteTask, onRefresh }) => {
  if (loading) {
    return (
      <TaskListContainer>
        <LoadingContainer>
          <Spinner />
          <p>Загрузка задач...</p>
        </LoadingContainer>
      </TaskListContainer>
    );
  }

  if (tasks.length === 0) {
    return (
      <TaskListContainer>
        <AddTaskButton to="/add">
          <span>+</span> Добавить задачу
        </AddTaskButton>
        <EmptyState>
          <EmptyIcon>📝</EmptyIcon>
          <h3>Нет задач</h3>
          <p>У вас пока нет ни одной задачи</p>
          <p>
            <Link to="/add" style={{ color: '#28a745', textDecoration: 'none' }}>
              Создайте свою первую задачу
            </Link>
          </p>
        </EmptyState>
      </TaskListContainer>
    );
  }

  // Подсчет задач по статусам
  const taskStats = tasks.reduce((stats, task) => {
    stats[task.status] = (stats[task.status] || 0) + 1;
    return stats;
  }, {});

  return (
    <TaskListContainer>
      <AddTaskButton to="/add">
        <span>+</span> Добавить задачу
      </AddTaskButton>
      
      <TaskListHeader>
        <h2>Список задач ({tasks.length})</h2>
        <TaskStats>
          <StatItem>
            <StatNumber>{taskStats['In Process'] || 0}</StatNumber>
            <StatLabel>В процессе</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{taskStats['Completed'] || 0}</StatNumber>
            <StatLabel>Завершено</StatLabel>
          </StatItem>
        </TaskStats>
      </TaskListHeader>
      
      <TaskListItems>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </TaskListItems>
    </TaskListContainer>
  );
};

// TaskListItems styled component
const TaskListItems = styled.div`
  display: grid;
  gap: 15px;
  margin-top: 20px;
`;

export default TaskList;
