const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'financial.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create financial_insights table
  db.run(`
    CREATE TABLE IF NOT EXISTS financial_insights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      insight_type TEXT,
      content TEXT,
      predicted_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  console.log('Database initialized successfully at:', dbPath);
});

db.close();