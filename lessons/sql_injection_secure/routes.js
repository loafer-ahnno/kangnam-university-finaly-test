// lessons/sql_injection_secure/routes.js
const express = require('express');
const path    = require('path');
const sqlite3 = require('sqlite3').verbose();
const router  = express.Router();

// 같은 DB 파일을 읽기 전용으로 엽니다
const db = new sqlite3.Database(
  path.join(__dirname, '..', 'sql_injection', 'db.sqlite'),
  sqlite3.OPEN_READONLY
);

// (1) 안전 조회 폼 화면
//    GET /lesson/sql_secure
router.get('/', (req, res) => {
  res.render('sql_secure_form', { id: '' });
});

// (2) 안전 조회 실행
//    GET /lesson/sql_secure/query?id=...
router.get('/query', (req, res) => {
  const id = req.query.id || '';
  // Prepared Statement 로 인젝션 방어
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(500).send('DB 오류: ' + err.message);
    res.render('sql_secure_result', { id, rows });
  });
});

module.exports = router;