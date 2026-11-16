const express = require('express')
const add = require('./math')
const app = express()
const PORT = 4000
app.get('/', (req, res) => {
    res.send(`Normal page  ${PORT} port .`)
})

app.get('/home', (req, res) => {
    res.send(`Welcome to Express Server Running on ${PORT} port .
    Sum of two numbers is : ${add(5, 6,)}`)
})
app.listen(PORT, () => {
    console.log(`Port is Running `)
})
console.log(add(5, 6,))