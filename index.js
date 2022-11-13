const express = require('express')

const testSmallModule = require('./testSmallModule')
const randomGenerator = require('./randomGenerator')

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  data = await testSmallModule.get()

  res.status(200).json(data)
})

app.get('/insert', async (req, res) => {
  dummyData = { 
    id: randomGenerator.generateAlphanumericSpecialCharacters(10),
    name: randomGenerator.generateText(10),
    phone: randomGenerator.generateNumber(10),
    address: randomGenerator.generateAlphanumeric(20)
  }

  testSmallModule.insert(dummyData)

  res.status(200).json({ message: 'success' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
