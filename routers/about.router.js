const controller = require("../controllers/about.controller")
const router = require("express").Router()

router.get("/about", controller.getAboutPage)

module.exports = router