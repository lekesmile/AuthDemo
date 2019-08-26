require('./database')

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const ejs = require('ejs')
const flash = require('express-flash')





const app = express();

const authRoutes = require('./routes/auth')





app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())



app.use(function (req, res, next) {
    res.locals.user = req.user
    console.log(req.user)
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})


app.use(authRoutes)


// Server Configuration


const runningPort = process.env.PORT || 8000;
app.set('port', runningPort)
app.listen(app.get('port'), () => {
    console.log(`server is up & running on port ${runningPort} `)
})