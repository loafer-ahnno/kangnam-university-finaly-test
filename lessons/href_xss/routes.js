// lessons/href_xss/routes.js
const express = require('express');
const router  = express.Router();

// GET /lesson/href_xss?url=...
router.get('/', (req, res) => {
  // 사용자 입력값
  const url = req.query.url || '';
  res.render('href_form', { url });
});

module.exports = router;