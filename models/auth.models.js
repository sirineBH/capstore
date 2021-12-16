const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cnx = require("../db")

var schemaUser = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    login: String
})

var User = mongoose.model('users', schemaUser)
//var url = "mongodb://localhost:27017/store"


exports.postRegisterData = (fname, lname, email, login) => {
    return new Promise((resolve, reject) => {

        cnx.dbConnect().then(() => {
            //check user exists
            return User.findOne({ "email": email })
        }).then((user) => {
            if (user) {
                mongoose.disconnect()
                reject("email is used")
            } else {
                let hPassword = bcrypt.hash(login, 2)
                return hPassword
            }

        }).then((hPassword) => {
            let user = new User({
                fname: fname,
                lname: lname,
                email: email,
                login: hPassword
            })
            return user.save()

        }).then((user) => {

            mongoose.disconnect()
            resolve(user)

        }).catch((err) => {
            reject(err)
        })
    })
}

exports.postLoginData = (email, login) => {
    return new Promise((resolve, reject) => {

        cnx.dbConnect().then(() => {
            return User.findOne({ "email": email })
        }).then((user) => {
            if (user) {
                bcrypt.compare(login, user.login).then((verif) => {
                    if (verif) {
                        mongoose.disconnect()
                        resolve(user._id)
                    } else {
                        mongoose.disconnect()
                        reject('password incorrect')
                    }
                })
            } else {
                mongoose.disconnect()
                reject("user not found")
            }

        }).catch((err) => {
            reject(err)
        })
    })
}
