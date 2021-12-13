const controller = require("../controllers/cap.controller")
const autController = require("../controllers/auth.controller")
const router = require("express").Router()
const guardAuth = require("./guardAuth")
const multer = require("multer")
const bodyParser = require("body-parser").urlencoded({ extended: true })

router.get("/admin/addCap", guardAuth.isAuth, controller.getaddCapController)
router.post("/admin/addCap", multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'assets/images')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('image'), guardAuth.isAuth, controller.postaddCapController)

router.get("/admin/myCaps", guardAuth.isAuth, controller.getCapsByAdmin)
router.post("/deleteCap", bodyParser, guardAuth.isAuth, controller.deleteCap)

router.post("/updateCap/", bodyParser, guardAuth.isAuth, controller.updateCap)

router.get('/admin/loginAdmin', autController.getLoginAdminPage)
router.post('/admin/loginAdmin', bodyParser, autController.postLoginAdminData)

module.exports = router