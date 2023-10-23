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
    if (users) {
        res.send(users)
    } else {
        res.status(404).json({ message: 'No users found' })
    }
})

app.get("/users/:id", async (req, res) => {
    const userId = req.params.id
    const user = await getUser(userId)
    if (user) {
        res.send(user)
    } else {
        res.status(404).json({ message: 'user not found or does not exist' })
    }
})

app.get("/teams", async (req, res) => {
    const teams = await getTeams()
    if (teams) {
        res.send(teams)
    } else {
        res.status(404).json({ message: 'No teams found' })
    }
})

app.get("/teams/:id", async (req, res) => {
    const teamId = req.params.id
    const team = await getTeam(teamId)
    if (team) {
        res.send(team)
    } else {
        res.status(404).json({ message: 'Team not found or does not exist' })
    }
})