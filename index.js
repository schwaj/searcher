const restaurantService = require('./services/restaurantService')

async function app () {
  const results = await restaurantService.search({
    name: '',
    rating: '',
    distance: '',
    price: '',
    cuisine: ''
  })
  console.log(results)
}
app()
