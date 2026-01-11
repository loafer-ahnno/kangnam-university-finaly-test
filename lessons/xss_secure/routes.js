// lessons/xss_secure/routes.js
const express = require('express');
const router  = express.Router();

// (1) 폼 화면: 입력값 그대로 GET 파라미터로 넘김
router.get('/', (req, res) => {
  res.render('xss_form_secure', { msg: '' });
});

// (2) 결과 화면: 모든 출력은 자동 이스케이프(<%= %>)로 렌더링
router.get('/reflect', (req, res) => {
  const msg = req.query.msg || '';
  res.render('xss_result_secure', { msg });
});

module.exports = router;