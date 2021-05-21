const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))

const connectDataBase = async () => {
    try {
        const mongoUrl = config.get('mongoUrl')
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('Hello world')
        })
    } catch (e) {
        console.log('Error connect DB', e.message);
    }
}

connectDataBase()
