const controller = require("../controllers/contact.controller")
const router = require("express").Router()

router.get("/contact", controller.getContactPage)

module.exports = router