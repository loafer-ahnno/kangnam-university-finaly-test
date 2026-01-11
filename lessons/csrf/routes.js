const express = require('express');
const router = express.Router();

// POST 폼 처리를 위한 body-parser (Express 4.16+ 내장)
router.use(express.urlencoded({ extended: false }));

// 1) 폼 페이지
router.get('/', (req, res) => {
  // 예시: 기존 이메일은 guest@example.com
  res.render('csrf_form', { currentEmail: 'guest@example.com' });
});

// 2) 폼 제출 처리 (CSRF 보호 없음!)
router.post('/update', (req, res) => {
  const email = req.body.email || '';
  res.render('csrf_result', { email });
});

// ▶ GET 요청도 똑같이 처리 (URL로 결과 확인용)
router.get('/update', (req, res) => {
  const email = req.query.email || '';
  res.render('csrf_result', { email });
});

module.exports = router;