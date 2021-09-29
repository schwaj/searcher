# Assessment


- [Assessment](#assessment)
  - [How To Run](#how-to-run)
  - [Assumptions](#assumptions)
  - [Problem Thought Process](#problem-thought-process)
  - [Considerations](#considerations)

## How To Run
- Open a terminal
- Navigate to the root directory
- Run the following command in the terminal
- `npm i` 
- Open the index.js file in the root directory
- Modify the object argument with the following properties as desired:
  - name
    - string
  - rating
    - int
  - distance
    - int
  - price
    - int
  - cuisine
    - string
  - Example:
    - `{ name: 'kitchen', rating: 3, distance: 5, price: 15, cuisine: 'Greek' }`
- Save the index.js file with your modifications
- Run the following command in the terminal
- `npm start`
- The terminal will output the results of your search
## Assumptions
- I'd be using a more sophisticated ORM that will utilize strong typing.
- The ORM would handle the join between the two associated data sets (tables). Under this assumption I've returned the data with the join ID removed and the cuisine name inserted in its place.
## Problem Thought Process
- Business problem:
  - I want to be able to filter my restaurant search results
- Development problem:
  - Data needs to be in a consumable format
    - I've used a package to convert the data from CSV to JSON, I did this async since the package supports up to 90,000 records per second.
  - Inputs need to be validated
    - I've included an output array to capture and return all the validation errors.
  - Data needs to be filtered
  - Filtered data needs to respect field priority
    - I've used a package called lodash with has some built-in order by logic.
  - Function needs to be testable in isolation without dependencies
    - I've included a couple unit tests in:
      - `__tests__/restaurantService.test.js`
## Considerations
- I've included a couple unit tests, this could be extended further to improve testing around filtering priority, individually testing the input validations, and larger data sets.
- Another method for testing the function without concern for the database would be to use dependency injection for the data layer or repository abstraction if we weren't in node with the ability to mock the entire module.
- I included paging for the data set, in the initial function you can modify the page number as well as the page size. Returned from the function includes the paging information previous, current, and next page, page size, and total count. 
- the logic around input validation could be extracted further and be called as something with arguments such as property name + data type or two arrays containing names and the other containing associated data types. They could both have their use-cases. 