const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

// DB 파일 경로 지정
const dbPath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath);

// 1) 입력 폼 렌더링
router.get('/', (req, res) => {
  res.render('sql_form');  
});

// 2) 취약 쿼리 실행 & 결과 렌더링
router.get('/query', (req, res) => {
  const user = req.query.username || '';
  // ❌ 검증 없이 문자열을 바로 삽입 → SQLi 취약
  const sql = `SELECT id, username, password FROM users WHERE username = '${user}'`;
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.render('sql_result', { rows });
  });
});

module.exports = router;