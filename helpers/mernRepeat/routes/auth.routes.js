const {Router} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult } = require('express-validator')

const router = Router()

router.post('/register',
    [
        check('email', 'Не корректный email').isEmail(),
        check('password', 'Не корректный пароль. Его длина должна быть не менее 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Не корректные данные регистрации',
                errors: errors.array()
            })
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже есть'})
        }

        const hashPassword = await bcryptjs.hash(password, 12)
        const user = new User({email, password: hashPassword})
        await user.save()
        res.json({message: 'Пользователь добавлен'})

    } catch (e) {
        res.status(500).json({message: 'Какая-то ошибка при регистрации'})
    }
})

router.post('/login',
    [
        check('email', 'Не корректный email').isEmail(),
        check('password', 'Не корректный пароль. Его длина должна быть не менее 6 символов').isLength({min: 6})
    ],
    async(req, res)=> {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Не корректные данные входа',
                errors: errors.array()
            })
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: 'Такго пользователя нет'})
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'Пароли не совпадают'})
        }
        const jwtToken = jwt.sign(
            {userId: user._id},
            config.get('jwtSecretKey'),
            {expiresIn: '1h'}
        )

        res.status(200).json({userId: user._id, token:jwtToken})
    } catch (e) {
        res.status(500).json({message: 'Какая-то ошибка при входе'})
    }
})

module.exports = router
