// Smart Contract FizzBuzz
// Create a function called fizzBuzz that accepts a uint called _number and returns a string memory. The function should return:

// "Fizz" if the _number is divisible by 3
// "Buzz" if the _number is divisible by 5
// "FizzBuzz" if the _number is divisible by 3 and 5
// "Splat" if none of the above conditions are true
// Do Not Disturb
// Create a function called doNotDisturb that accepts a _uint called _time, and returns a string memory. It should adhere to the following properties:

// If _time is greater than or equal to 2400, trigger a panic
// If _time is greater than 2200 or less than 800, revert with a custom error of AfterHours, and include the time provided
// If _time is between 1200 and 1259, revert with a string message "At lunch!"
// If _time is between 800 and 1199, return "Morning!"
// If _time is between 1300 and 1799, return "Afternoon!"
// If _time is between 1800 and 2199, return "Evening!"
