const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new Database('finder.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reporter_id TEXT,
    target_id TEXT,
    reason TEXT,
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    is_banned INTEGER DEFAULT 0,
    ban_reason TEXT
  );
`);

app.post('/api/report', (req, res) => {
  const { reporterId, targetId, reason, description } = req.body;
  if (!targetId || !reason) return res.status(400).json({ msg: '缺少必要参数' });

  const stmt = db.prepare('INSERT INTO reports (reporter_id, target_id, reason, description) VALUES (?, ?, ?, ?)');
  stmt.run(reporterId, targetId, reason, description);
  res.json({ success: true, msg: '举报已提交，我们将尽快核实处理！' });
});

app.get('/api/user/status/:userId', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.userId);
  if (user && user.is_banned === 1) {
    return res.status(403).json({ isBanned: true, reason: user.ban_reason });
  }
  res.json({ isBanned: false });
});

app.post('/api/admin/ban', (req, res) => {
  const { userId, reason } = req.body;
  db.prepare('INSERT OR REPLACE INTO users (id, is_banned, ban_reason) VALUES (?, 1, ?)').run(userId, reason || '违规操作');
  res.json({ success: true, msg: '用户 ' + userId + ' 已被封禁' });
});

app.listen(port, () => console.log('Server is running on port ' + port));
