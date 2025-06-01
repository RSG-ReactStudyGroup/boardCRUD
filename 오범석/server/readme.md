# 게시판 구현

## 사용 라이브러리

1. express: 웹 서버를 구성하는 핵심 프레임워크
2. morgan: 요청 로그를 출력하는 미들웨어
3. cookie-parser: 쿠키를 파싱해 req.cookies로 제공
4. dotenv: .env 파일로 환경 변수 관리
5. debug: 디버깅 로깅용 유틸
6. jsonwebtoken: JWT 토큰 생성 및 검증
7. bcrypt: 비밀번호 해시 처리
8. cors: CORS 설정을 위한 미들웨어
9. nodemon: 개발 중 자동 재시작
10. mysql2: MariaDB 연동용
11. express-validator: 입력값 유효성 검증

## 프로젝트 디렉토리 구조

```text
server/
├── www/                  # 서버 실행 진입점 (예: node www)
├── app.js                # Express 앱 설정 (라우터, 미들웨어 등)
├── routes/               # 라우터 정의
├── controllers/          # 컨트롤러 함수 정의 (비즈니스 로직)
├── models/               # 데이터베이스 연결 및 쿼리 모듈
├── middlewares/          # 인증, 에러 처리 등의 미들웨어
├── .env                  # 환경 변수 설정 파일
├── package.json          # 프로젝트 메타 및 의존성
├── readme.md             # 프로젝트 설명 문서
```

## 데이터베이스 테이블 설계

- Table: users
    -- id: int, PK, AUTO_INCREMENT
    -- username: varchar
    -- email: varchar, UNIQUE
    -- password: varchar
    -- created_at: datetime
    -- updated_at: datetime

- Table: posts
    -- id: int, PK, AUTO_INCREMENT
    -- title: varchar
    -- content: text
    -- user_id: int, FK → users.id
    -- views: int, @default(0)
    -- created_at: datetime
    -- updated_at: datetime

- Table: login_logs
    -- id: int, PK, AUTO_INCREMENT
    -- user_id: int, FK → users.id
    -- ip_address: varchar(45)
    -- user_agent: varchar(255)
    -- logged_in_at: datetime (default: now)
