const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath);

function initializeDatabase() {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, status TEXT DEFAULT "In Process", createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)');

    db.get('SELECT COUNT(*) as count FROM tasks', (err, row) => {
      if (err) {
        return;
      }
      if (row && row.count === 0) {
        db.run('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', ['Купить продукты', 'Молоко, хлеб', 'In Process']);
        db.run('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', ['Завершить проект', 'Доделать веб-сервер', 'Completed']);
      }
    });
  });
}

initializeDatabase();

module.exports = db;


