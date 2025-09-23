ВЕБ-СЕРВЕР НА NODE.JS

веб-сервер для управления задачами.

ЗАПУСК:

1. npm install
2. npm start

ФАЙЛЫ:

- server.js - сервер и маршруты
- db.js - инициализация базы данных и экспорт подключения
- package.json - зависимости
- tasks.db - база данных (создается автоматически)

API:

GET  /api/tasks     - все задачи
GET  /api/tasks/:id - задача по ID  
POST /api/tasks     - создать задачу
PATCH /api/tasks/:id - обновить поля задачи (title, description, status)
DELETE /api/tasks/:id - удалить задачу

Примеры команд для взаимодействия с базой в файле .\COMMANDS.txt