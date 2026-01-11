const express = require('express');
const path    = require('path');
const sqlite3 = require('sqlite3').verbose();
const router  = express.Router();

// 기존 DB 파일 사용
const db = new sqlite3.Database(
  path.join(__dirname, '..', 'blind_boolean', 'db.sqlite'),
  sqlite3.OPEN_READONLY
);

// (1) 안전 폼 렌더링
// GET /lesson/blind_boolean_secure
router.get('/', (req, res) => {
  res.render('blind_boolean_form_secure', { name: '', char: '' });
});

// (2) 안전 조회 실행
// GET /lesson/blind_boolean_secure/query?name=...&char=...
router.get('/query', (req, res) => {
  const name = req.query.name || '';
  const char = req.query.char || '';

  // 입력값 단순 검증: 이름은 문자열, char는 한 글자만 허용
  if (char.length !== 1) {
    return res.render('blind_boolean_result_secure', {
      name,
      char,
      rows: [],                    // rows 도 넘겨 줘야 템플릿이 rows 참조 시 에러 안납니다
      conditionMet: false,
      error: '비교 문자는 한 글자만 입력하세요.'
    });
  }

  // Prepared Statement로 파라미터 바인딩
  const sql = `
    SELECT *
      FROM items
     WHERE name = ?
       AND (SELECT substr(password,1,1)
              FROM users
             WHERE username='admin') = ?
  `;
  db.all(sql, [name, char], (err, rows) => {
    if (err) return res.status(500).send('DB 오류: ' + err.message);
    const conditionMet = rows.length > 0;
    res.render('blind_boolean_result_secure', {
      name,
     char,
      rows,
      conditionMet,
      error: ''                    // 정상 흐름에서도 error 변수를 반드시 넘겨 줍니다
    });
  });
});

module.exports = router;