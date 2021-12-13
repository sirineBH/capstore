const capModel = require("../models/cap.models")

exports.capController = (req, res, next) => {
    capModel.getAllCaps().then(caps => {
        res.render(`shop`, { caps: caps, verif: req.session.user })

    })
}

exports.capLimitedController = (req, res, next) => {
    capModel.getLimitedCaps().then(caps => {
        res.render(`index`, { caps: caps, verif: req.session.user })

    })
}

exports.getCapById = (req, res, next) => {
    let id = req.params.id;
    capModel.getCapById(id).then(cap => {
        res.render(`details`, { cap: cap, verif: req.session.user })

    })
}

exports.getaddCapController = (req, res, next) => {
    res.render(`./admin/addCap`, { verif: req.session.user, successMessage: req.flash('successAdd')[0], failedMessage: req.flash('failedAdd')[0] })
}

exports.getCapsByAdmin = (req, res, next) => {
    capModel.getCapsByAdmin(req.session.user)
        .then((caps) => {
            res.render('./admin/myCaps', {
                caps: caps,
                verif: req.session.user,
                successMessage: req.flash('successDel')[0], failedMessage: req.flash('failedDel')[0],
                successMessage: req.flash('successUp')[0], failedMessage: req.flash('failedUp')[0]
            })
        })
}

exports.postaddCapController = (req, res, next) => {
    capModel.postaddCapController(req.body.title, req.body.type, req.body.price, req.body.description, req.file.filename, req.session.user)
        .then((message) => {
            //           console.log(message)
            req.flash('successAdd', message)
            res.redirect('/admin/addCap')
        }).catch((err) => {
            //            console.log(err)
            req.flash('failedAdd', err)
            res.redirect('/admin/addCap')
        })

}


exports.deleteCap = (req, res, next) => {
    capModel.deleteCap(req.body.cap)
        .then(message => {
            req.flash('successDel', message)
            res.redirect('/admin/myCaps')

        }).catch((err) => {
            req.flash('failedDel', err)
            res.redirect('/admin/myCaps')
        })
}

exports.updateCap = (req, res, next) => {
    capModel.updateCap(req.body.title, req.body.type, req.body.price, req.body.description, req.session.user, req.body.cap)
        .then((message) => {
            req.flash('successUp', message)
            res.redirect('/admin/myCaps')
        }).catch((err) => {
            console.log(err)
            req.flash('failedUp', err)
            res.redirect('/admin/myCaps')
        })

}