import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

const result = await pool.query("SELECT * FROM users")
console.log(result[0])