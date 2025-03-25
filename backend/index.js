const dotenv= require('dotenv');
dotenv.config();
const connectToMongo = require('./db')
const express = require('express') 

connectToMongo()

const app = express()
const port = 5000
//define middleware
app.use(express.json())

//available routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))
app.listen(port , () => {
    console.log(`example listening on http://localhost:${port} `)
})