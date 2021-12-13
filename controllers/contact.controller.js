

exports.getContactPage = (req, res, next) => {
    res.render(`contact`, { verif: req.session.user })
}