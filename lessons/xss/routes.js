const express = require('express');
const router = express.Router();

// 1) 입력 폼
router.get('/', (req, res) => {
  res.render('xss_form');
});

// 2) 페이로드 반사(취약!)
router.get('/reflect', (req, res) => {
  // 사용자 입력을 검증/이스케이프 하지 않고
  const msg = req.query.msg || '';
  // EJS의 unescaped 출력(<%- %>)을 이용해 XSS 발생
   // allow alert('XSS!') or alert("XSS!") with optional spaces
  // <script>…alert( … )…</script> 형태라면 모두 정답으로 인정
  const xssPattern = /<script>[\s\S]*?alert\(\s*['"]?(?:XSS|1)['"]?\s*\)[\s\S]*?<\/script>/i;
  const isCorrect = xssPattern.test(msg);

  res.render('xss_result', { msg, isCorrect });
});

module.exports = router;