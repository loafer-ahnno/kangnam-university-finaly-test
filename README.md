# 🛡️ Web Security Analysis & Secure Coding Practice
**강남대학교 졸업 프로젝트 (Web Security Final Test)**

이 프로젝트는 웹 애플리케이션에서 빈번하게 발생하는 주요 보안 취약점을 직접 구현해보고, 이를 방어하기 위한 **시큐어 코딩(Secure Coding)** 기법을 1:1로 비교 분석한 실습 저장소입니다.

## 🎯 프로젝트 목적
* **취약점 원리 파악:** BAC, CSRF, XSS 등 주요 웹 공격의 메커니즘을 코드로 이해
* **방어 전략 수립:** 동일한 기능을 안전하게 구현하는 시큐어 코딩 적용 및 비교 테스트
* **실무 역량 강화:** Node.js(EJS) 환경에서의 백엔드 보안 로직 및 유효성 검사 실습

## 🛠 Tech Stack
* **Backend:** Node.js, Express
* **Frontend:** EJS (Embedded JavaScript templates), Tailwind CSS
* **Languages:** JavaScript, HTML/CSS

## 🔍 핵심 실습 내용 (Vulnerability vs Secure)
각 취약점 항목별로 '취약한 코드'와 '보안이 적용된 코드'를 분리하여 구현했습니다.

* **Broken Access Control (BAC):** 비정상적인 경로를 통한 파일 접근(`public.txt`, `secret.txt`) 및 권한 로직 점검
* **Cross-Site Request Forgery (CSRF):** 사용자 의도와 무관한 요청 방어 및 토큰 검증 로직 구현
* **Cross-Site Scripting (XSS):** `href_xss`, `mutation_xss` 등 다양한 경로의 스크립트 주입 공격 방어
* **Blind SQL Injection (Boolean-based):** 데이터베이스 응답 차이를 이용한 정보 유출 메커니즘 분석 및 방어
* **Open Redirect:** 검증되지 않은 외부 리다이렉션 차단 및 화이트리스트 기반 리다이렉션 구현

## 📂 프로젝트 구조 (Comparison Structure)
```text
lessons/
├── [취약점명]/          # 취약점이 존재하는 실습 코드 (예: bac, csrf, href_xss)
└── [취약점명]_secure/   # 시큐어 코딩이 적용된 방어 코드 (예: bac_secure, csrf_secure)

```
## 👤 Contributor
* **Name:** ahnno (lofer-ahnno)
