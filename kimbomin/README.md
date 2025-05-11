# 게시판 만들기

## 주제 : 게시판

## DB 스키마 설계

### 회원 users
```
CREATE TABLE users (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	email VARCHAR(40) NOT NULL UNIQUE,
	password VARCHAR(40) NOT NULL,
	nickname VARCHAR(30) NOT NULL
);
```

### 게시글 posts
SELECT * FROM users;
```
CREATE TABLE posts (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	contents VARCHAR(2000) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	user_id INT,
	
	FOREIGN KEY (user_id) REFERENCES users(id) -- 외래키 설정
);
```

## 프로젝트 구조
```
noticeBoard/
├── app.js                 <-- 서버 진입점
├── controllers/           <-- 로직 처리 함수 모음
├── routes/                <-- 라우터 (URL → 컨트롤러 연결)
├── db/                    <-- DB 연결 관련 모듈

app.js	전체 서버를 시작하는 진입점. 서버 설정, 미들웨어, 라우터 등록 등
controllers/	각 기능(게시글, 회원 등)에 대한 실제 동작 정의 (DB 쿼리 포함 가능)
routes/	URL 라우팅 처리, HTTP 메서드별로 컨트롤러 연결
db/	MariaDB 연결 풀 또는 설정을 관리
```