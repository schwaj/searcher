const database = require('../data')
const restaurantService = require('../services/restaurantService')

jest.mock('../data')
const getRestaurants = database.getRestaurants

beforeEach(() => {
  getRestaurants.mockReset()
})
describe('search', () => {
  it('should return 5 validation errors', async () => {
    const nameValidationMessage = 'Name is in an invalid format. Expected a string.'
    const ratingValidationMessage = 'Rating is in an invalid format. Expected an integer.'
    const distanceValidationMessage = 'Distance is in an invalid format. Expected an integer.'
    const priceValidationMessage = 'Price is in an invalid format. Expected an integer.'
    const cuisineValidationMessage = 'Cuisine is in an invalid format. Expected a string.'
    getRestaurants.mockImplementation(() => {})

    const results = await restaurantService.search({ name: 1, rating: '1', distance: '1', price: '1', cuisine: 1 }, 1, 5)

    expect(results.errors).toContain(nameValidationMessage)
    expect(results.errors).toContain(ratingValidationMessage)
    expect(results.errors).toContain(distanceValidationMessage)
    expect(results.errors).toContain(priceValidationMessage)
    expect(results.errors).toContain(cuisineValidationMessage)
    expect(results.restaurants).toEqual([])
  })
  it('should return sorted search results', async () => {
    const restaurantData = [
      {
        name: '2',
        customer_rating: 3,
        distance: 1,
        price: 10,
        cuisine: 'Spanish'
      },
      {
        name: '1',
        customer_rating: 4,
        distance: 1,
        price: 15,
        cuisine: 'Chinese'
      },
      {
        name: '3',
        customer_rating: 4,
        distance: 2,
        price: 20,
        cuisine: 'Korean'
      },
      {
        name: '5',
        customer_rating: 3,
        distance: 2,
        price: 11,
        cuisine: 'Korean'
      },
      {
        name: '4',
        customer_rating: 3,
        distance: 2,
        price: 10,
        cuisine: 'Russian'
      }
    ]

    const outputData = {
      restaurants: [
        {
          name: '1',
          customer_rating: 4,
          distance: 1,
          price: 15,
          cuisine: 'Chinese'
        },
        {
          name: '2',
          customer_rating: 3,
          distance: 1,
          price: 10,
          cuisine: 'Spanish'
        },
        {
          name: '3',
          customer_rating: 4,
          distance: 2,
          price: 20,
          cuisine: 'Korean'
        },
        {
          name: '4',
          customer_rating: 3,
          distance: 2,
          price: 10,
          cuisine: 'Russian'
        },
        {
          name: '5',
          customer_rating: 3,
          distance: 2,
          price: 11,
          cuisine: 'Korean'
        }
      ],
      errors: [],
      paging: { totalCount: 5, prev: null, curr: 1, next: null, pageSize: 5 }
    }
    const pageSize = 5
    const pageNumber = 1

    getRestaurants.mockImplementation(() => restaurantData)

    const results = await restaurantService.search({}, pageNumber, pageSize)

    expect(getRestaurants).toHaveBeenCalled()
    expect(results.restaurants).toEqual(outputData.restaurants)
    expect(results.paging.pageSize).toEqual(5)
    expect(results.paging.curr).toEqual(1)
  })
})
