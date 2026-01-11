const express = require('express');
const router  = express.Router();

// GET /lesson/mutation_xss?frag=...
router.get('/', (req, res) => {
  const frag = req.query.frag || '';
  res.render('mutation_form', { frag });
});

module.exports = router;