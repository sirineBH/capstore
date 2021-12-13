const router = require("express").Router()
const controller = require("../controllers/auth.controller")
const bodyparser = require("express").urlencoded({ extended: true })
const guardAuth = require("./guardAuth")

router.get('/register', guardAuth.notAuth, controller.getRegisterPage)
router.post('/register', bodyparser, controller.postRegisterData)

router.get('/login', guardAuth.notAuth, controller.getLoginPage)
router.post('/login', bodyparser, controller.postLoginData)

router.post('/logout', bodyparser, controller.logout)

module.exports = router