const express = require('express')

const testSmallModule = require('./modules/testSmallModule')
const randomGenerator = require('./modules/randomGenerator')

const app = express()
const port = 3000

setInterval(async () => {
  const jobs = await testSmallModule.getPendingJobs()
  jobs.forEach(async (job) => {
    await testSmallModule.executeJob(job)
    await job.update({ state: 'executed' })
  })
}, 60000)

app.get('/', async (req, res) => {
  data = await testSmallModule.get()

  res.status(200).json(data)
})

app.get('/create', async (req, res) => {
  dummyData = { 
    name: randomGenerator.generateText(10),
    phone: randomGenerator.generateNumber(10),
    address: randomGenerator.generateAlphanumeric(20)
  }

  testSmallModule.create(dummyData)

  res.status(200).json({ message: 'success' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
