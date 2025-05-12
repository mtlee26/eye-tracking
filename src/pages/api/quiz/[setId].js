import path from 'path';
import sqlite3 from 'sqlite3';

const dbPath = path.resolve('data', 'quiz_data.db');
const db = new sqlite3.Database(dbPath);

export default function handler(req, res) {
  const { setId } = req.query;

  if (req.method === 'GET') {
    const query = `
      SELECT * FROM questions
      WHERE set_id = ?
    `;
    db.all(query, [setId], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.status(200).json({ questions: rows });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
