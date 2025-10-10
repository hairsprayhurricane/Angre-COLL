const express = require('express');

const app = express();
const PORT = 3069;
const db = require('./db');

app.use(express.json());

// Получить все задачи
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка базы данных' });
    } else {
      res.json(rows);
    }
  });
});

// Получить задачу по ID
app.get('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка базы данных' });
    } else if (!row) {
      res.status(404).json({ error: 'Задача не найдена' });
    } else {
      res.json(row);
    }
  });
});


// Создать новую задачу
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Заголовок обязателен' });
  }

  db.run('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description || ''], function(err) {
    if (err) {
      res.status(500).json({ error: 'Ошибка создания задачи' });
    } else {
      res.status(201).json({ id: this.lastID, title, description: description || '', status: 'In Process' });
    }
  });
});

// Обновить задачу (частичное обновление)
app.patch('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const allowedFields = ['title', 'description', 'status'];
  const setClauses = [];
  const values = [];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      setClauses.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  if (setClauses.length === 0) {
    return res.status(400).json({ error: 'Нет данных для обновления' });
  }

  const sql = `UPDATE tasks SET ${setClauses.join(', ')} WHERE id = ?`;
  values.push(id);

  db.run(sql, values, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Ошибка обновления задачи' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    db.get('SELECT * FROM tasks WHERE id = ?', [id], (getErr, row) => {
      if (getErr) {
        return res.status(500).json({ error: 'Ошибка получения обновленной задачи' });
      }
      res.json(row);
    });
  });
});

// Удалить задачу
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Ошибка удаления задачи' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    res.json({ success: true });
  });
});

// Главная страница
app.get('/', (req, res) => {
  res.json({ message: 'API сервер работает', endpoints: ['GET /api/tasks', 'GET /api/tasks/:id', 'POST /api/tasks', 'PATCH /api/tasks/:id', 'DELETE /api/tasks/:id'] });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});