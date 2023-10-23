import express from 'express'

import { getUser, getUsers, getTeams, getTeam } from './database.js'

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

app.get("/teams", async (req, res) => {
    const teams = await getTeams()
    res.send(teams)
})

app.get("/teams/:id", async (req, res) => {
    const teamId = req.params.id
    const team = await getTeam(teamId)
    res.send(team)
})