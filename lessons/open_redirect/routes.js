const express = require('express');
const router = express.Router();

// (1) 입력 폼
router.get('/', (req, res) => {
  res.render('open_redirect_form');
});

// (2) 바로 리다이렉트 (검증 없음!)
router.get('/go', (req, res) => {
  const next = req.query.next;
  // ❌ 검증 없이 넘어온 URL로 리다이렉트 → Open Redirect 취약
  return res.redirect(next);
});

module.exports = router;