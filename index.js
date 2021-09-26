const restaurantService = require('./services/restaurantService')

async function app () {
  const results = await restaurantService.search({
    // name: 'kitchen',
    // rating: 3,
    // distance: 5,
    // price: 15,
    // cuisine: 'Greek'
  }, 40, 5)
  console.log(results)
}
app()
