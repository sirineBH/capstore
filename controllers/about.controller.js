

exports.getAboutPage = (req, res, next) => {
    res.render(`about`, { verif: req.session.user })
}