const express = require('express')
const config  = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port')
const urlDB = config.get('mongoUrl')

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))

const connectDB = async () => {
    try {
       await mongoose.connect(urlDB, {
           useNewUrlParser: true,
           useCreateIndex: true,
           useUnifiedTopology: true
       })
        app.listen(5000, () => {console.log(`Server started on port ${PORT}`)})
    } catch (e) {
        console.log('Ошибка подключения к БД', e)
    }
}

connectDB()
