const parse = require('csv-parse/lib/sync')
const fs = require('fs').promises
const path = require('path')

exports.getRestaurants = async () => {
  const parseOptions = { columns: true, cast: true }
  const restaurantsCsv = await fs.readFile(path.join(__dirname, './restaurants.csv'))
  const cuisinesCsv = await fs.readFile(path.join(__dirname, './cuisines.csv'))
  const restaurants = parse(restaurantsCsv, parseOptions)
  const cuisines = parse(cuisinesCsv, parseOptions)

  restaurants.forEach((restaurant) => {
    const foundCuisine = cuisines.find((cuisine) => {
      return restaurant.cuisine_id === cuisine.id
    })
    delete restaurant.cuisine_id
    restaurant.cuisine = foundCuisine.name
  })
  return restaurants
}
