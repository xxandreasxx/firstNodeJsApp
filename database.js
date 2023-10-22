import mysql from 'mysql2'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUsers() {
    const result = await pool.query("SELECT * FROM users")
    return result[0]
}

export async function getUser(id) {
    const [result] = await pool.query(`
    select * from users where id = ?
    `, [id])
    return result[0]
}

export async function createUser(firstName, lastName) {
    const newUuid = uuidv4();
    const [result] = await pool.query(`insert into users (id, firstName, lastName) values (?, ?, ?)`,
        [newUuid, firstName, lastName])
    return getUser(newUuid)
}

export async function getTeams() {
    const result = await pool.query(`select * from teams`)
    return result[0]
}

export async function getTeam(id) {
    const [result] = await pool.query(`select * from users where id = ?`, [id])
    return result[0]
}

export async function createTeam(name) {
    const newUuid = uuidv4()
    const [result] = await pool.query(`insert into teams (id, name) values (?, ?)`,
        [newUuid, name])
    return getTeam(newUuid)
}