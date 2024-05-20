const express = require('express')

const dotenv = require('dotenv')
const routes = require('./src/routes/task.routes')
const connectToDatabase = require('./src/database/mongoose.database')

dotenv.config()
const app = express()
app.use(express.json())

connectToDatabase()
app.use('/tasks', routes)

const PORT = 3000

app.listen(3000, () => console.log(`Server is listening on ${PORT}`))