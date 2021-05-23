const {Router} = require('express')
const config = require('config')
const shortId = require('shortid')
const Link = require('../models/link')
const auth = require('../middleware/link.middleware')

const router = Router()

router.post('/generation', auth, async (req, res) => {
    try {
        const {from} = req.body
        const baseUrl = config.get('baseUrl')
        const code = shortId.generate()
        const isExisting = await Link.findOne({from})
        if (isExisting) return res.status(400).json({message: 'Такая ссылка уже есть'})

        const to = baseUrl + /t/ + code
        const link = new Link({from, to, code, owner: req.user.userId})
        await link.save()
        res.json({message: 'Ссылка добавлена'})
    } catch (e) {
        res.status(400).json({message: `Какая-то ошибка при генерации ссылки ${e}`})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.status(200).json({links})
    } catch (e) {
        res.status(400).json({message: `Какая-то ошибка при получении всех ссылок ${e}`})
    }
})

module.exports = router
