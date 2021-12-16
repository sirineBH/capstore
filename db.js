const mongoose = require('mongoose')

const url = `mongodb+srv://infowiste:Infowiste2101@cluster.d9dgk.mongodb.net/store?retryWrites=true&w=majority`;
//const url = `mongodb://localhost:27017/store`

const connectionParams = {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
}
exports.dbConnect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, connectionParams)
            .then(() => {
                resolve(true)
            })
            .catch((err) => {
                reject(err)
            })
    })

}