# Серверная часть Task Manager

Express.js сервер для управления задачами с базой данных SQLite.

## Структура

```
backend/
├── server.js          # Основной файл сервера Express
├── db.js             # Подключение к базе данных SQLite
├── tasks.db          # Файл базы данных SQLite
├── package.json      # Зависимости серверной части
├── COMMANDS.txt      # Примеры SQL команд
└── README.md         # Этот файл
```

## Запуск

### Из корневой папки проекта
```bash
npm run backend
```

### Из папки backend
```bash
cd backend
npm install
npm start
```

Сервер будет доступен по адресу: http://localhost:3069

## API для работы с задачами

| Метод | Адрес | Описание |
|-------|-------|----------|
| GET | `/api/tasks` | Получить все задачи |
| GET | `/api/tasks/:id` | Получить задачу по ID |
| POST | `/api/tasks` | Создать новую задачу |
| PATCH | `/api/tasks/:id` | Обновить задачу |
| DELETE | `/api/tasks/:id` | Удалить задачу |

## Используемые технологии

- Express.js - веб-фреймворк для Node.js
- SQLite3 - база данных
- Node.js - среда выполнения JavaScript

## Структура базы данных

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT "In Process",
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Примеры использования API

### Создание задачи
```bash
curl -X POST http://localhost:3069/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Новая задача", "description": "Описание"}'
```

### Получение всех задач
```bash
curl http://localhost:3069/api/tasks
```

### Обновление задачи
```bash
curl -X PATCH http://localhost:3069/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "Completed"}'
```

### Удаление задачи
```bash
curl -X DELETE http://localhost:3069/api/tasks/1
```

## Дополнительные команды

Примеры SQL команд для работы с базой данных находятся в файле COMMANDS.txt.