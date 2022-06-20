const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
require('./db/conn')
app.use(express.json())

app.use(cors({
    origin: '*'
}))

const router = require('./routers/routes')
app.use(router)

app.listen(port, ()=> console.log(`Server Started at http://localhost:${port}`))