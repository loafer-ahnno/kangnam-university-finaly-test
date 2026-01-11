// lessons/open_redirect_secure/routes.js
const express = require('express');
const url     = require('url');
const router  = express.Router();

// 허용할 호스트 목록
const ALLOWED_HOSTS = new Set([
  'example.com',
  'yourdomain.com'   // 실제 학습용 도메인으로 교체하세요
]);

// 1) 폼 화면: GET /lesson/open_redirect_secure
router.get('/', (req, res) => {
  // ?url= 이 있을 수 있으니 넘겨 줍니다
  const target = (req.query.url || '').trim();
  res.render('open_redirect_form_secure', { target });
});

// 2) 결과 화면: GET /lesson/open_redirect_secure/redirect?url=...
router.get('/redirect', (req, res) => {
  const raw = (req.query.url || '').trim();
  let ok = false, error = '';

  if (!raw) {
    error = 'URL 파라미터가 없습니다.';
  } else {
    try {
      const parsed = new URL(raw);
      if ((parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
          ALLOWED_HOSTS.has(parsed.hostname)) {
        ok = true;
      } else {
        error = '허용되지 않는 호스트입니다.';
      }
    } catch (e) {
      error = '유효하지 않은 URL입니다.';
    }
  }

  res.render('open_redirect_result_secure', {
    target: raw,
    ok,
    error
  });
});

module.exports = router;