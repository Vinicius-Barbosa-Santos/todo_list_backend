const mongoose = require('mongoose')

const connectToDatabase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lv1axoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

module.exports = connectToDatabase