const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

const defaultController = require('./routes/default-router')

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

app.use('/', defaultController);

module.exports = app;