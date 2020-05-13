const express = require('express')
const router = express.Router()
const userCtl = require('../controller/users.controller')

router.post('/signup', userCtl.signup)
router.post('/login', userCtl.login)
router.post('/msgConf', userCtl.sendMsgConf)

module.exports = router