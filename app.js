const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
// app.use(cors())
app.use(cors());
app.options('*', cors());
// app.use(cors({ origin: true  }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
dotEnv.config()

const PORT = process.env.PORT
const dbUrl = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@backendmongo.wksoy.mongodb.net/${process.env.MONG_DB_DATABASE}?retryWrites=true&w=majority`
app.get('/', (req, res) => {
    return res.json({
        error: false,
        msg: "Server is running "
    })
})

/**
 * Routes
 */

const authRoutes = require('./routes/auth')
const fileRoutes = require('./routes/file.routes')
const bloodbank = require('./routes/bloodbank')
const request = require('./routes/request')
const camp = require('./routes/camp.route')

app.use('/auth', authRoutes)
app.use('/file', fileRoutes)
app.use('/bank', bloodbank)
app.use('/request', request)
app.use('/camp', camp)

app.listen(PORT, () => {
    console.warn(`http://localhost:${PORT}`)
    mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(data => {
            // console.log(data)
            console.warn("Mongo database is connected")
        }).catch(er => {
            console.error(er)
        })
})