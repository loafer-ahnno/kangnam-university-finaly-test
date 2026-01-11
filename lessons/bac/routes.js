const express = require('express');
const fs      = require('fs');
const path    = require('path');
const router  = express.Router();

// (1) 인덱스 페이지: 공개 파일 링크 제공
router.get('/', (req, res) => {
  res.render('bac_index');
});

// (2) 파일 조회 (IDOR 취약! 검증 없음)
router.get('/files', (req, res) => {
  const file = req.query.file || '';
  const filePath = path.join(__dirname, 'data', file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  const content = fs.readFileSync(filePath, 'utf8');
  res.render('bac_file', { file, content });
});

module.exports = router;