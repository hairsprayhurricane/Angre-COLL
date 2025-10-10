import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка задач при монтировании компонента
  useEffect(() => {
    fetchTasks();
  }, []);

  // Функция для загрузки всех задач
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Ошибка загрузки задач');
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  };

  // Функция для добавления новой задачи
  const addTask = async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Ошибка создания задачи');
      }

      const newTask = await response.json();
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    }
  };

  // Функция для обновления задачи
  const updateTask = async (id, updates) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления задачи');
      }

      const updatedTask = await response.json();
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? updatedTask : task
        )
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    }
  };

  // Функция для удаления задачи
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления задачи');
      }

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Менеджер задач</h1>
          <p>Управляйте своими задачами эффективно ТВАР</p>
        </div>
      </header>

      <main className="container">
        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={fetchTasks}>Попробовать снова</button>
          </div>
        )}

        <TaskForm onAddTask={addTask} />

        <TaskList 
          tasks={tasks}
          loading={loading}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
