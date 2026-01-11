// lessons/href_xss_secure/routes.js
const express = require('express');
const router  = express.Router();

// GET /lesson/href_xss_secure?url=...
router.get('/', (req, res) => {
  // express가 자동으로 decodeURIComponent 해 줍니다
  const url = (req.query.url || '').trim();
  res.render('href_form_secure', { url });
});

module.exports = router;