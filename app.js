import express from 'express'

import { getUser, getUsers, getTeams, getTeam } from './database.js'

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('something broke!')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})


app.get("/users", async (req, res) => {
    const users = await getUsers()
    if (users) {
        res.json(users)
    } else {
        res.status(404).json({ message: 'No users found' })
    }
})

app.get("/users/:id", async (req, res) => {
    const userId = req.params.id
    const user = await getUser(userId)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: 'user not found or does not exist' })
    }
})

app.get("/teams", async (req, res) => {
    const teams = await getTeams()
    if (teams) {
        res.json(teams)
    } else {
        res.status(404).json({ message: 'No teams found' })
    }
})

app.get("/teams/:id", async (req, res) => {
    const teamId = req.params.id
    const team = await getTeam(teamId)
    if (team) {
        res.json(team)
    } else {
        res.status(404).json({ message: 'Team not found or does not exist' })
    }
})