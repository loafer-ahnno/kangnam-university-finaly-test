// lessons/union_sqli_secure/routes.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path    = require('path');
const router  = express.Router();

// 1) SQLite DB 연결 (읽기 전용)
const dbPath = path.join(__dirname, 'db.sqlite');
const db     = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('DB 연결 실패:', err.message);
  } else {
    console.log('✅ Union-Secure DB 열림:', dbPath);
  }
});

// 2) 폼 화면: ID, cols 입력
//    GET /lesson/union_sqli_secure
router.get('/', (req, res) => {
  // 처음 진입할 땐 id, cols, error, rows 모두 빈 값으로 넘겨 줍니다.
  res.render('union_form_secure', {
    id:    '',
    cols:  '',
    error: '',
    rows:  []
  });
});

// 3) 결과 처리: 안전하게 조회 (Prepared Statement + 입력 검증)
//    GET /lesson/union_sqli_secure/query?id=1&cols=2
router.get('/query', (req, res) => {
  const idRaw   = (req.query.id   || '').trim();
  const colsRaw = (req.query.cols || '').trim();
  let error     = '';
  let rows      = [];

  // --- 입력값 검증 (Validation) ---
  // ID와 cols는 반드시 숫자만 허용하도록 정규식 검사
  if (!/^\d+$/.test(idRaw) || !/^\d+$/.test(colsRaw)) {
    error = 'ID와 컬럼 수는 숫자만 입력해야 합니다.';
    return res.render('union_result_secure', {
      id:    idRaw,
      cols:  colsRaw,
      error,
      rows
    });
  }

  // 숫자형으로 변환
  const id   = parseInt(idRaw, 10);
  const cols = parseInt(colsRaw, 10);

  // --- Prepared Statement 사용 예시 --- 
  // (Union 쿼리를 직접 작성하지 않고, 예시로 items 테이블에서 id를 조회만 합니다.)
  // 실제 Union-based 실습은 취약 버전에만 두고, Secure 버전에서는 단순 조회로 대체합니다.
  const sql = 'SELECT id, title FROM items WHERE id = ?';

  db.all(sql, [id], (err, resultRows) => {
    if (err) {
      error = 'DB 조회 중 오류가 발생했습니다.';
      return res.render('union_result_secure', {
        id:    idRaw,
        cols:  colsRaw,
        error,
        rows:  []
      });
    }

    // 조회된 결과가 배열로 내려옵니다.
    rows = resultRows;

    // --- 뷰에 네 가지 변수를 모두 넘겨 줍니다 ---
    res.render('union_result_secure', {
      id:    idRaw,     // 원본 문자열(idRaw)을 그대로 보내야 입력 필드에도 남습니다.
      cols:  colsRaw,   // 원본 문자열(colsRaw)
      rows,             // 조회된 레코드 배열
      error: ''         // 문제가 없으면 빈 문자열
    });
  });
});

module.exports = router;