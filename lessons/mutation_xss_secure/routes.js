const express = require('express');
const router  = express.Router();

// (1) 방어 폼 화면
// GET /lesson/mutation_xss_secure
router.get('/', (req, res) => {
  res.render('mutation_form_secure', { frag: '' });
});

// (2) 방어 결과 화면
// GET /lesson/mutation_xss_secure/render?frag=...
router.get('/render', (req, res) => {
  const frag = req.query.frag || '';
  // EJS의 escape (<%= %>)만으로 XSS 방어
  res.render('mutation_result_secure', { frag });
});

module.exports = router;