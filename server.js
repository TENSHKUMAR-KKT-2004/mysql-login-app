const express = require('express')
require('dotenv').config()

const app = express()

// routes importing
const Route = require('./routes/router.js')

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// view engine
app.set('view engine', 'ejs')

const PORT = 8080
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  })

app.use('',Route)

app.use((req, res) => {
    res.status(404).send("404 not found")
  })