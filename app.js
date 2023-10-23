import express from 'express'

import { getUser, getUsers } from './database.js'

const app = express()

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('something broke!')
})


app.get("/users", async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

app.get("/users/:id", async (req, res) => {
    const userId = req.params.id
    const user = await getUser(userId)
    res.send(user)
})