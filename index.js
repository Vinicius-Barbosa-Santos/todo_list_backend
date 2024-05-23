const express = require('express')

const cors = require('cors')

const dotenv = require('dotenv')
const routes = require('./src/routes/task.routes')
const connectToDatabase = require('./src/database/mongoose.database')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectToDatabase()
app.use('/tasks', routes)

const PORT = 8080

app.listen(8080, () => console.log(`Server is listening on ${PORT}`))