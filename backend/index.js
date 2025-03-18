const dotenv= require('dotenv');
dotenv.config();
const connectToMongo = require('./db')
const express = require('express') 

connectToMongo()

const app = express()
const port = process.env.PORT
app.get('/' , (req, res) => {
    res.send("hello");
})

app.listen(port , () => {
    console.log(`example listening on http://localhost:${port} `)
})