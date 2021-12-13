exports.isAuth = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

exports.notAuth = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/")
    } else {
        next()
    }
}