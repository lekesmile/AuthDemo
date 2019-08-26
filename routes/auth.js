const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('passport')
const passportConf = require('../passport')


// Home routes
router.get('/', (req, res) => {
    res.render('auth/home')
})


router.post('/',  async (req, res, next) => {
    try {
        let newUser = new db.User()
        newUser.email = req.body.email
        newUser.password = req.body.password

        await newUser.save()
        res.redirect('/login')

    } catch (err) {
        return next(err)
    }

})

//Login routes

router.get('/login', (req, res) => {
    res.render('auth/login')
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile'
}))


// Profile routes

router.get('/profile', (req, res) => {
    res.render('auth/profile')
})


// Logout route

router.post('/profile', (req, res)=>{
    res.render('auth/logout')
})





module.exports = router;