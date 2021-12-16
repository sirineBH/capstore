const mongoose = require("mongoose")
const cnx = require("../db")

var schemaCap = mongoose.Schema({
    //_id: { type: mongoose.ObjectId, required: true },
    title: String,
    price: Number,
    type: String,
    description: String,
    image: String,
    addedBy: String,
    creationDate: Date,
    deleted: Number
})

var Cap = mongoose.model('caps', schemaCap)
//var url = "mongodb://localhost:27017/store"

exports.getAllCaps = () => {
    return new Promise((resolve, reject) => {
        cnx.dbConnect().then(() => {
            return Cap.find({ deleted: 0 })
        }).then(cap => {
            console.log(cap)
            mongoose.disconnect()
            resolve(cap)
        }).catch(err => reject(err))
    })
}

exports.getLimitedCaps = () => {
    return new Promise((resolve, reject) => {
        cnx.dbConnect().then(() => {
            return Cap.find({ deleted: 0 }).limit(3)
        }).then(cap => {
            mongoose.disconnect()
            resolve(cap)
        }).catch(err => reject(err))
    })
}

exports.getCapById = (id) => {
    return new Promise((resolve, reject) => {
        cnx.dbConnect().then(() => {
            return Cap.findById(id)
        }).then(cap => {
            mongoose.disconnect()
            resolve(cap)
        }).catch(err => reject(err))
    })
}

exports.postaddCapController = (title, type, price, description, filename, user) => {
    return new Promise((resolve, reject) => {
        cnx.dbConnect().then(() => {
            let cap = new Cap({
                title: title,
                type: type,
                price: price,
                description: description,
                image: filename,
                addedBy: user,
                creationDate: new Date().toISOString(),
                deleted: 0,
            })
            return cap.save()
        }).then(cap => {
            mongoose.disconnect()
            resolve("added successfuly")
        }).catch(err => reject(err))
    })
}

exports.getCapsByAdmin = (id) => {
    return new Promise((resolve, reject) => {
        cnx.dbConnect().then(() => {
            return Cap.find({ addedBy: id, deleted: 0 })
        }).then(caps => {
            mongoose.disconnect()
            resolve(caps)
        }).catch(err => reject(err))
    })
}

exports.deleteCap = (id) => {
    return new Promise((resolve, reject) => {
        cnx.dbConnect().then(() => {
            return Cap.updateOne({ _id: id }, { deleted: 1 })
        }).then(() => {
            mongoose.disconnect()
            resolve("product deleted")
        }).catch(err => reject(err))
    })
}

exports.updateCap = (title, type, price, description, user, id) => {
    return new Promise((resolve, reject) => {
        cnx.dbConnect().then(() => {
            return Cap.updateOne({ _id: id },
                { title: title, type: type, price: price, description: description, addedBy: user })
        }).then(() => {
            mongoose.disconnect()
            resolve("product updated")
        }).catch(err => reject(err))
    })
}