const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

app.engine('html', require('ejs').renderFile)

app.set('view-engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'))
app.use(session({
    secret: 's3cr37',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

app.use('/', require('./routes/default-router'));

module.exports = app;