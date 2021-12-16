const express = require("express")
const path = require("path")
const flash = require("connect-flash")
const session = require("express-session")
const mongoDbStore = require("connect-mongodb-session")(session)

const routerCap = require("./routers/cap.router")
const routerShop = require("./routers/shop.router")
const routerAuth = require("./routers/auth.router")
const routerAdmin = require("./routers/admin.router")
const routerContact = require("./routers/contact.router")
const routerAbout = require("./routers/about.router")

const server = express()
const PORT = process.env.PORT || 3000;

var store = new mongoDbStore({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/store',
    collection: "sessions"
})

server.use(flash())

server.use(session({
    secret: "new caps collection 2022",
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    resave: true,
    saveUninitialized: true
}))

server.use(express.static(path.join(__dirname, "assets")))
server.set("view engine", "ejs")
server.set("views", "views")

server.use("/", routerCap)
server.use("/", routerContact)
server.use("/", routerAbout)
server.use("/", routerShop)
server.use("/", routerAuth)
server.use("/:id", routerCap)

server.all("/admin/loginAdmin", routerAdmin)
server.all("/admin/addCap", routerAdmin)
server.all("/admin/myCaps", routerAdmin)
server.all("/deleteCap", routerAdmin)
server.all("/updateCap", routerAdmin)


if (process.env.NODE_ENV === 'production') {
    server.use(express.static(path.join(__dirname, 'views')));

    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'index.ejs'))
    });
}

server.listen(PORT)