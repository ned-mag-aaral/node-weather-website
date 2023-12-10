const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hanbdlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

/**
 * My comments
 * 
// this will reflect in route 'localhost:3000' if this comes first before the 
// app.use(express.static())
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// this will reflect if the app.get() is not present above 
// or if the route is explicitly declares like localhost:3000/index.html

This is because Express looks for the first route match from the top
 */

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Ako Talaga'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ako Talaga'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help hbs',
        name: 'Ako Talaga',
        helpMessage: 'This is the help page rendered by hbs'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Error request'
        }) 
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Ako Talaga',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ako Talaga',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 