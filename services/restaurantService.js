const db = require('../data')
const invariant = require('invariant')

exports.search = async ({ name, rating, distance, price, cuisine }) => {
  const errors = []
  // invariant(name && name.length > 0, 'Name is in an invalid format.')
  // invariant(rating && (isNaN(rating) || rating < 0 || rating > 5), 'Rating is in an invalid format.')
  // invariant(distance && (isNaN(rating) || rating < 0 || rating > 5), 'Distance is in an invalid format.')
  // invariant(price && (isNaN(rating) || rating < 0 || rating > 5), 'Price is in an invalid format.')
  // invariant(cuisine && cuisine.length > 0, 'Cuisine is in an invalid format.')

  const restaurants = await db.getRestaurants()
  const filteredRestaurants = restaurants.filter(r => {
    if (name && !r.name.trim().toLowerCase().match(name.toLowerCase())) {
      return false
    }
    if (rating && r.rating > rating) {
      return false
    }
    if (distance && r.distance > distance) {
      return false
    }
    if (price && r.price > price) {
      return false
    }
    if (cuisine && !r.cuisine.toLowerCase().match(cuisine)) {
      return false
    }
    return true
  })
  return {
    restaurants: filteredRestaurants,
    errors: errors
  }
}