const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const specialCharacters = '!@#$%^&*()_+~`|}{[]\:;?><,./-=\'"'
const letters = upperCase + lowerCase
const alphanumeric = letters + numbers
const alphanumericSpecialCharacters = alphanumeric + specialCharacters

const generateText = (length) => generateRandomString(letters, length)

const generateNumber = (length) => generateRandomString(numbers, length)

const generateAlphanumeric = (length) => generateRandomString(alphanumeric, length)

const generateAlphanumericSpecialCharacters = (length) => {
  return generateRandomString(alphanumericSpecialCharacters, length)
}

const getRandomInt = (max) => Math.floor(Math.random() * max)

const generateRandomCharacter = (sourceString) => {
  const randomInt = getRandomInt(sourceString.length)
  return sourceString.charAt(randomInt)
}

const generateRandomString = (sourceString, length) => {
  const randomString = [...Array(length)].map(() => {
    return generateRandomCharacter(sourceString)
  })

  return randomString.join('')
}

module.exports = {
  generateText,
  generateNumber,
  generateAlphanumeric,
  generateAlphanumericSpecialCharacters,
  getRandomInt
}