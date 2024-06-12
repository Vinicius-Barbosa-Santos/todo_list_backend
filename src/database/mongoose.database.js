const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lv1axoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("Conectando ao MongoDB com sucesso!")
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err)
    }
}

module.exports = connectToDatabase