const express = require('express')

const dotenv = require('dotenv')
const connectToDatabase = require('./src/database/mongoose.database')

dotenv.config() 
const app = express()

connectToDatabase()

app.get('/tasks', (request, response) => {

    const tasks = [
        {
            description: 'Estudar Java',
            isCompleted: false
        }
    ]

    response.status(200).send(tasks)
})

const PORT = 3000

app.listen(3000, () => console.log(`Server is listening on ${PORT}`))