const bcrypt = require('bcrypt');

const mysql = require('../config/config');

exports.allUsers = (req, res) => {
    mysql.getConnection((error, conn) => {

        const sql = `SELECT * FROM usuarios;`

        conn.query(sql, (err, result) => {
            res.json(result)
        })
    })
}

exports.renderRegisterUser = (req, res) => {
    // console.log(req.flash('message'));
    res.render('register.ejs')
}

exports.registerUser = async (req, res) => {

    let { login, email, senha } = req.body;

    try {
        const hashedPass = await bcrypt.hash(senha, 10)

        mysql.getConnection((err, conn) => {

            const sql = `insert into usuarios (nome, email , senha) values(?,?,?);`

            conn.query(sql, [login, email, hashedPass], (err, result) => {

                conn.release();

                if (!err) {
                    req.flash('message', 'saved succesfully')
                    res.redirect('/login')
                } else {
                    res.send(err.message)
                }
            })
        })

    } catch (error) {
        req.flash('message', 'erro')
        res.redirect('/register')
    }

}

exports.login = (req, res) => {


    let { nome, email, senha } = req.body


    mysql.getConnection((error, conn) => {

        const sql = `SELECT * FROM usuarios;`

        conn.query(sql, (error, result) => {
            conn.release();

            if (error) {
                return res.status(400).send(error);
            }

            res.render('login.ejs', { message: req.flash('message') })

        })


    })




}