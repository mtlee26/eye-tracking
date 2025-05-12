import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('data', 'quiz_data.db');
const db = new sqlite3.Database(dbPath);

export default function handler(req, res) {
  if (req.method === 'GET') {
    const query = "SELECT * FROM quiz_sets";
    db.all(query, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.status(200).json({ quizSets: rows });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
