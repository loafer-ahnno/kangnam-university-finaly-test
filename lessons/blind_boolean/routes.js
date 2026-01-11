// lessons/blind_boolean/routes.js

const express = require('express');
const router  = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path    = require('path');

// db.sqlite 파일 경로를 __dirname 기준으로 지정
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'));

// 1) 폼 렌더링
//    GET /lesson/blind_boolean/
router.get('/', (req, res) => {
  res.render('blind_boolean_form');
});

// 2) 쿼리 실행 및 결과 렌더링
//    GET /lesson/blind_boolean/query?name=...
router.get('/query', (req, res) => {
  // 사용자가 입력한 name 파라미터 (payload 포함)
  const name = req.query.name || '';

  // 검증 없는 직삽입 → Boolean-based Blind SQLi 실습용
  const sql = `
    SELECT *
      FROM items
     WHERE name = '${name}'
  `;

  db.all(sql, (err, rows) => {
    if (err) {
      // DB 에러 시 메시지 출력
      return res.status(500).send(err.message);
    }

    // rows.length > 0 이면 조건이 참
    const conditionMet = rows.length > 0;

    // payload에서 비교할 문자(예: 's')만 추출
    // name 예시: "apple' AND (...) = 's' --"
    let guessedChar = '';
    const m = name.match(/=\s*'([^']+)'/);
    if (m) guessedChar = m[1];

    // blind_boolean_result.ejs 로 데이터 전달
    res.render('blind_boolean_result', {
      rows,
      conditionMet,
      guessedChar
    });
  });
});

module.exports = router;