// lessons/bac_secure/routes.js
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const router  = express.Router();

// 허용된 파일명 화이트리스트
const ALLOWED = new Set([
  'public.txt',
  'info.txt',
]);

// (1) 폼 화면
// GET /lesson/bac_secure
router.get('/', (req, res) => {
  res.render('bac_form_secure', { file: '' });
});

// (2) 파일 조회 처리
// GET /lesson/bac_secure/file?file=...
router.get('/file', (req, res) => {
  const raw = (req.query.file || '').trim();
  // 1) 허용 목록에 있는지
  if (!ALLOWED.has(raw)) {
    return res.render('bac_result_secure', {
      file: raw,
      error: '❌ 접근이 허용되지 않는 파일명입니다.',
      content: ''
    });
  }
  // 2) 절대경로 조합 (디렉터리 탈출 방지)
  const safePath = path.join(__dirname, '..', 'bac', 'public', raw);
  fs.readFile(safePath, 'utf8', (err, data) => {
    if (err) {
      return res.render('bac_result_secure', {
        file: raw,
        error: '❌ 파일을 읽는 중 오류가 발생했습니다.',
        content: ''
      });
    }
    res.render('bac_result_secure', {
      file: raw,
      error: '',
      content: data
    });
  });
});

module.exports = router;