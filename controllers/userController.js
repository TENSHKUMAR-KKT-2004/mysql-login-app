const mysql = require('mysql2')

// MySQL connection pool configuration
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
}).promise()

async function getAllUsers() {
  const [users] = await pool.query('SELECT * FROM user')
  return users
}

const login_page = async (req, res) => {
  res.render('login')
}

const authenticateUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const allUsers = await getAllUsers()
    const user = await allUsers.find(
      (user) => user.username === username && user.password === password
    )

    if (!user) {
      // Incorrect credentials or user not found
      return res.status(401).render('login', { error: 'Invalid username or password' })
    } else {
      // User found and authenticated
      // Store session identifier instead of the username
      req.session.user = user.id
      return res.redirect('/user-panel')
    }
  } catch (error) {
    console.error('Error authenticating user:', error)
    res.status(500).render('login', { error: 'Internal server error' })
  }
}

const changePasswordPage = async (req, res) => {
  res.render('changePassword')
}

const changePassword = async (req, res) => {
  const { mobileNumber, newPassword } = req.body

  try {
    const [users] = await pool.query('SELECT * FROM user WHERE phone = ?', [mobileNumber])
    const user = users[0]

    if (!user) {
      return res.status(401).json({ error: 'Invalid mobile number' })
    }

    await pool.query('UPDATE user SET password = ? WHERE id = ?', [newPassword, user.id])
    return res.status(200).json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error changing password:', error)
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
    res.render('adminPanel', { data })
  } catch (error) {
    console.error('An error occurred while fetching data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  }
}


const userPanel = async (req, res) => {
  try {
    const userId = req.session.user
    const [userData] = await pool.query('SELECT * FROM user WHERE id = ?', [userId])
    const user = { id: userData[0].id, name: userData[0].username }
    res.render('addDetails', { user })
  } catch (error) {
    console.error('Error retrieving user data:', error) 
    res.status(500).json({ error: 'Internal server error' }) 
  }
}

const addDetails = async (req, res) => {
  const { orderDate, item, count, weight, requests } = req.body
  try {
    // Update OrderTable with the provided order details
    const orderItem = {
      order_id: Math.floor(Math.random() * 1000000) + 1,
      order_date:orderDate,
      item,
      count,
      weight,
      requests
    } 

    await pool.query('INSERT INTO Orderitem SET ?', [orderItem]) 

    res.status(200).json({ message: 'Order details added successfully' }) 
  } catch (error) {
    console.error('Error adding order details:', error) 
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

module.exports = { login_page, authenticateUser, changePasswordPage, changePassword, adminPanel, userPanel, addDetails, logout }