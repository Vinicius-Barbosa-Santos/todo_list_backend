require('express-async-errors')
const express = require('express')

const cors = require('cors')

const app = express()
const dotenv = require('dotenv')
const routes = require('./routes')
const AppError = require('./utils/app.errors.js')
const connectToDatabase = require('./database/mongoose.database.js')

app.use(express.json())
dotenv.config()
app.use(cors())

connectToDatabase()
app.use(routes)

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'internal server error'
    })
})

const PORT = 8080
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
