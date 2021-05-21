const {Router} = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

const router = Router()
const User = require('../models/user')


router.post('/register',
[
        check('email', 'Не корректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 симвлов').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                'errors': errors.array(),
                'message': 'Не корректные данные'
            })
        }
        console.log('req', req.body);
        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if (candidate) {
            res.status(400).json({message: 'Такой пользователь есть'})
        }

        const hashPassword = bcryptjs.hash(password)
        const user = new User({email, password: hashPassword})
        user.save()

        res.status(200).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500).json({message: e})
        throw Error(e)
    }
})

router.post('/login',
    [
        check('email', 'Не коректный Email').isEmail(),
        check('password', 'Поле обязательно для заполнеия').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.status(400).json({
                'errors': errors.array(),
                'message': 'Не корректные данные'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if (!candidate) {
            res.status(400).json({message: 'Такого пользвателя нет'})
        }

        const isMatch = bcryptjs.compare(candidate.password, password)
        !isMatch && res.status(400).json({message: 'Не корректный пароль'})

        const token = jwt.sign(
            {userId: candidate.id},
            config.get('JWTSecret'),
            { expiresIn: '1h' }
        )

        res.json({token, userId: candidate.id})
    } catch (e) {
        res.status(500).json({message: e})
        throw Error(e)
    }
})

module.exports = router