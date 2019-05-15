// [case 1]input: 9, expect output: Fizz
// [case 1]input: 50, expect output: Buzz
// [case 1]input: 45, expect output: FizzBuzz
// [case 1]input: 59, expect output: 59 

var should = chai.should()

describe('function fizzBuzz', function () {
  it('Return Fizz if input unmber divided by 3.', function () {
    var result = fizzBuzz(9)
    result.should.be.equal('Fizz')
  })
  it('Return Buzz if input unmber divided by 5.', function () {
    var result = fizzBuzz(50)
    result.should.be.equal('Buzz')
  })
  it('Return FizzBuzz if input unmber divided by 15.', function () {
    var result = fizzBuzz(45)
    result.should.be.equal('FizzBuzz')
  })
  it('Return number if input unmber not divided by 3 and 5', function () {
    var result = fizzBuzz(59)
    result.should.be.equal(59)
  })
})
