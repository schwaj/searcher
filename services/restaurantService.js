const db = require('../data')
const _ = require('lodash')

exports.search = async ({ name, rating, distance, price, cuisine }, page, pageSize) => {
  const startTime = new Date().getTime()
  page = page < 1 ? 1 : page
  const errors = []
  let filteredRestaurants = []
  if (name && !_.isString(name)) {
    errors.push('Name is in an invalid format. Expected a string.')
  }
  if (rating && !_.isNumber(rating)) {
    errors.push('Rating is in an invalid format. Expected an integer.')
  }
  if (distance && !_.isNumber(distance)) {
    errors.push('Distance is in an invalid format. Expected an integer.')
  }
  if (price && !_.isNumber(price)) {
    errors.push('Price is in an invalid format. Expected an integer.')
  }
  if (cuisine && !_.isString(cuisine)) {
    errors.push('Cuisine is in an invalid format. Expected a string.')
  }

  if (errors.length === 0) {
    const restaurants = await db.getRestaurants()
    filteredRestaurants = restaurants.filter(restaurant => {
      if (name && !restaurant.name.trim().toLowerCase().match(name.trim().toLowerCase())) {
        return false
      }
      if (rating && restaurant.customer_rating < rating) {
        return false
      }
      if (distance && restaurant.distance > distance) {
        return false
      }
      if (price && restaurant.price > price) {
        return false
      }
      if (cuisine && !restaurant.cuisine.trim().toLowerCase().match(cuisine.trim().toLowerCase())) {
        return false
      }
      return true
    })
    filteredRestaurants = _.orderBy(filteredRestaurants, ['distance', 'customer_rating', 'price'], ['asc', 'desc', 'asc'])
  }
  return {
    restaurants: filteredRestaurants.slice((page - 1) * pageSize, (page * pageSize)),
    errors: errors,
    paging: {
      totalCount: filteredRestaurants.length,
      prev: (page - 1) < 1 ? null : page - 1,
      curr: page,
      next: (page * pageSize) >= filteredRestaurants.length ? null : page + 1,
      pageSize: pageSize
    },
    responseTime: `${new Date().getTime() - startTime}ms`

  }
}
