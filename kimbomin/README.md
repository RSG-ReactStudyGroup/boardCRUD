# 게시판 만들기

## 주제 : 게시판

## DB 스키마 설계

### 회원 users
```
CREATE TABLE users (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	email VARCHAR(40) NOT NULL UNIQUE,
	password VARCHAR(40) NOT NULL
);
INSERT INTO users (email, password)
VALUES ('bomin', '1234');
```

### 게시글 posts
SELECT * FROM users;
```
CREATE TABLE posts (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	contents VARCHAR(2000) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	
	FOREIGN KEY (user_id) REFERENCES users(id) -- 외래키 설정
);
INSERT INTO posts (title, contents, user_id)
VALUES ('첫 게시글', '게시글 내용은 이렇습니다', 1);
SELECT * FROM posts;
-- updated_at 컬럼 추가
ALTER TABLE posts ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
-- 게시글 수정
UPDATE posts SET title = '이건 제목 수정' WHERE title = '테스트용 게시글' AND user_id = 2;
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