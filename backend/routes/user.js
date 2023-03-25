const express = require('express')
const { login, signup } = require('../controllers/user')

const router = express.Router()


router.post('/login', login)
router.post('/signin',signup)



module.exports = router