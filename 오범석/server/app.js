require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger(process.env.LOG_MODE));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

// 없는 라우터 요청 처리
app.use((req, res, next) => {
        res.status(404).json({ error: 'Not Found' });
    });

  // 서버 내부 에러 처리
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});


module.exports = app;
