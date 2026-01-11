// lessons/union_sqli/routes.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'));

// ① 입력 폼
router.get('/', (req, res) => {
  res.render('union_form');
});

// ② 취약 쿼리 & 결과
router.get('/query', (req, res) => {
  const id = req.query.id || '';
  // ❌ 파라미터 검증 없이 바로 삽입 → UNION 기반 SQLi 실습
  const sql = `
    SELECT id, title
    FROM articles
    WHERE id = '${id}'
  `;
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.render('union_result', { rows });
  });
});

module.exports = router;