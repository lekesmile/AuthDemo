const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/sundayDemo', { useNewUrlParser: true })
    .then(() => {
        console.log('Database connection is On and running')
    })
    .catch((err) => {
        console.log(err.message)
    })


    