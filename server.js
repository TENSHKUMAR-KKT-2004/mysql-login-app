const express = require('express')
const mysql = require('mysql2')

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

// MySQL connection pool configuration
mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin',
    database:'login_app_db'
}).promise()


const PORT = 8080
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  })

app.use('',Route)

app.use((req, res) => {
    res.status(404).send("404 not found")
  })