const authModel = require("../models/auth.models")

exports.getRegisterPage = (req, res, next) => {
    res.render(`register`, { verif: req.session.user, message: req.flash('error')[0] })
}

exports.postRegisterData = (req, res, next) => {
    authModel.postRegisterData(req.body.fname, req.body.lname, req.body.email, req.body.login)
        .then((user) => {
            res.render(`login`, { verif: req.session.user, message: req.flash('error')[0] })
        }).catch((err) => {
            req.flash('error', err)
            res.redirect('/register')
        })
}

exports.getLoginPage = (req, res, next) => {
    res.render(`login`, { verif: req.session.user, message: req.flash('error')[0] })
}

exports.postLoginData = (req, res, next) => {
    console.log("login")
    authModel.postLoginData(req.body.email, req.body.login)
        .then((id) => {
            req.session.user = id
            res.redirect(`/`)
        }).catch((err) => {
            req.flash('error', err)
            res.redirect('/login')
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}


exports.getLoginAdminPage = (req, res, next) => {
    res.render(`./admin/loginAdmin`, { verif: req.session.user, message: req.flash('logMsg')[0] })
}

exports.postLoginAdminData = (req, res, next) => {
    if (req.body.login == "1983") {
        req.flash('logMsg', "welcome")
        res.redirect('/admin/myCaps')
    } else {
        req.flash('logMsg', "GooGle it!!")
        res.redirect('/admin/loginAdmin')
    }

}