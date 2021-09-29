const restaurantService = require('./services/restaurantService')

async function app () {
  const results = await restaurantService.search({
    name: 1,
    rating: '3',
    distance: '5',
    price: '15',
    cuisine: 1
  }, 1, 5)
  console.log(results)
}
app()
