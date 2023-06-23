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
            res.render('login', { error: 'Invalid username or password' })
        }

        // User found and authenticated
        if (user.username === 'admin') {// Admin login
            res.status(200).json({ route: '/admin' });
        } else {// Customer login
            res.status(200).json({ route: '/customer' });
        }
    } catch (error) {
        console.error('Error authenticating user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const adminPanel = async(req,res)=>{
    res.send('admin panel')
}

const customerPanel = async (req,res)=>{
    res.send('customer panel')
}


module.exports = { login_page, authenticateUser,adminPanel,customerPanel }