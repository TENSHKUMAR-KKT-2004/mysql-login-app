const express = require('express')
const session = require('express-session')
require('dotenv').config()

const app = express()

// Configure session middleware
app.use(
    session({
      secret: process.env.SECRET_SESSION_KEY,
      resave: false,
      saveUninitialized: true,
    })
  )

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
    console.log(`server is listening on port ${PORT}`)
  })

app.use('',Route)

app.use((req, res) => {
    res.status(404).send("404 not found")
  })