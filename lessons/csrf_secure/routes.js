const express      = require('express');
const cookieParser = require('cookie-parser');
const csurf        = require('csurf');
const router       = express.Router();

// CSRF 토큰을 쿠키 기반으로 발급/검증
const csrfProtection = csurf({ cookie: true });

// body-parser (POST 폼 처리)
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

// (1) 안전 폼 렌더링
// GET /lesson/csrf_secure
router.get('/', csrfProtection, (req, res) => {
  // 초기 이메일은 guest@example.com 으로 고정
  res.render('csrf_form_secure', {
    email: 'guest@example.com',
    csrfToken: req.csrfToken()
  });
});

// (2) 토큰 검증+이메일 변경 처리
// POST /lesson/csrf_secure/update
router.post('/update', csrfProtection, (req, res) => {
  const newEmail = req.body.email;
  res.render('csrf_result_secure', {
    email: newEmail
  });
});

module.exports = router;