// Include express form node_modules
const express = require('express')
const app = express()

// Define the server related variables
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// Setting tamplate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static page
app.use(express.static('public'))

// Handle request and response
app.get('/', (req, res) => {
    res.render('index', {restaurants: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    console.log(req.params.restaurant_id)
    const restaurant = restaurantList.results.find( restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
    const keyword = new RegExp(req.query.keyword, 'i')
    const restaurants = restaurantList.results.filter( restaurant => restaurant.name_en.match(keyword) || restaurant.name.match(keyword) || restaurant.category.match(keyword))
    res.render('index', {restaurants: restaurants, keyword: req.query.keyword})
})

// Start and listen the server
app.listen(port, () => {
    console.log(`The Express server is on http://localhost:${port}`)
})