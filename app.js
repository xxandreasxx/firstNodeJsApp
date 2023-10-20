import express from 'express'

const app = express()

app.get("/users", (req, res) => {
    res.send("this should be the users")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})