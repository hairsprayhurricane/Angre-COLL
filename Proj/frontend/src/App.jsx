import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { TaskProvider, useTasks } from './context/TaskContext';

// Styled Components
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px 0;
  color: white;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #3a3f4b;
  }
  &.active {
    background-color: #61dafb;
    color: #282c34;
    font-weight: bold;
  }
`;

const MainContent = styled.main`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 60vh;
`;

const ErrorMessage = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const AppContent = () => {
  const { error } = useTasks();
  const navigate = useNavigate();

  return (
    <AppContainer>
      <Header>
        <h1 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Менеджер задач</h1>
        <p style={{ textAlign: 'center', margin: 0, opacity: 0.9 }}>Управляйте своими задачами эффективно</p>
        
        <Nav>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Список задач
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>
            Добавить задачу
          </NavLink>
        </Nav>
      </Header>

      <MainContent>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
          <Route 
            path="*" 
            element={
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Страница не найдена</h2>
                <p>Извините, запрашиваемая страница не существует.</p>
                <Link to="/" style={{ color: '#61dafb' }}>Вернуться на главную</Link>
              </div>
            } 
          />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};

const App = () => (
  <TaskProvider>
    <AppContent />
  </TaskProvider>
);

export default App;