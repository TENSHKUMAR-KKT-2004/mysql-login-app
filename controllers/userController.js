const mysql = require('mysql2')

// MySQL connection pool configuration
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise()

async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM auth_table')
    return rows
}

const login_page = async (req, res) => {
    res.render('login')
}

const authenticateUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const allUsers = await getAllUsers()
        const user = allUsers.find(
            (user) => user.username === username && user.password === password
        )

        // incorrect credentials or user not found
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        // User found and authenticated
        if (user.username === 'admin') {// Admin login
            req.session.user = { role: 'admin', username: 'admin' }
            return res.redirect('/admin')
        } else {// Customer login
            req.session.user = { role: 'customer', username: user.username }
            return res.redirect('/customer')
        }
    } catch (error) {
        console.error('Error authenticating user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// Protected routes

const adminPanel = async (req, res) => {
    try {
      // Process the data
      const data = {
        customer1: {
          quantity: 0,
          weight: 0,
          boxCount: 0,
        },
        customer2: {
          quantity: 0,
          weight: 0,
          boxCount: 0,
        },
        totalQuantity: 0,
        totalWeight: 0,
        totalBoxCount: 0,
      } 
  
      const [results] = await pool.query('SELECT * FROM customer_product_details') 
      
      // Calculate the sums for each category
      for (const result of results) {
        if (result.user === 'customer1') {
          data.customer1.quantity += result.quantity 
          data.customer1.weight += result.weight 
          data.customer1.boxCount += result.boxCount 
        } else if (result.user === 'customer2') {
          data.customer2.quantity += result.quantity 
          data.customer2.weight += result.weight 
          data.customer2.boxCount += result.boxCount 
        }
        data.totalQuantity += result.quantity 
        data.totalWeight += result.weight 
        data.totalBoxCount += result.boxCount 
      }
  
      console.log(data) 
      res.render('adminPanel', {data}) 
    } catch (error) {
      console.error('An error occurred while fetching data:', error) 
      res.status(500).json({ error: 'An error occurred while fetching data' }) 
    }
  } 
  

const customerPanel = async (req, res) => {
    res.render('customerPanel')
}

const addProductDetails = async (req, res) => {
    const { orderDate, company, owner, item, quantity, weight, shipmentRequest, trackingID, shipmentSize, boxCount, specification, checklistQuantity } = req.body
    console.log(orderDate, company)
    console.log(req.session.user.username)
    try {
        // Insert the product details into the 'customer_product_details' table
        const query = `INSERT INTO customer_product_details (user, orderDate, company, owner, item, quantity, weight, shipmentRequest, trackingID, shipmentSize, boxCount, specification, checklistQuantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const values = [req.session.user.username, orderDate, company, owner, item, quantity, weight, shipmentRequest, trackingID, shipmentSize, boxCount, specification, checklistQuantity]
        await pool.query(query, values)

        res.status(200).json({ message: 'Product details added successfully' })
    } catch (error) {
        console.error('Error adding product details:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
}

module.exports = { login_page, authenticateUser, adminPanel, customerPanel, addProductDetails, logout }