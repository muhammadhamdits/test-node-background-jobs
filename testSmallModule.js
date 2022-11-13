const fs = require('fs')

const jobList = JSON.parse(fs.readFileSync('jobList.json'))

const get = async () => JSON.parse(fs.readFileSync('testDb.json'))

const insert = async (data) => {
  const time = new Date().getTime()
  const randomTime = Math.floor(Math.random() * 60) + 1
  const timeWithRandom = time + (randomTime * 1000)

  addJob('insertDataWorker', data, timeWithRandom)

  if(jobList.length === 1) executeJob()
}

const addJob = async (name, args, time) => {
  jobList.push({ name, args, time })
  fs.writeFileSync('jobList.json', JSON.stringify(jobList))
}

const executeJob = async () => {
  reorderJobList()

  const orderedJobList = JSON.parse(fs.readFileSync('jobList.json'))
  job = orderedJobList.shift()
  stringJob = `${job.name}(${JSON.stringify(job.args)})`

  const time = new Date().getTime()
  const difference = job.time - time
  await new Promise(resolve => setTimeout(resolve, difference))
  eval(stringJob)

  const newJobList = JSON.parse(fs.readFileSync('jobList.json'))
  newJobList.shift()
  fs.writeFileSync('jobList.json', JSON.stringify(newJobList))
  
  if(newJobList.length > 0) executeJob()
}

const reorderJobList = async () => {
  const newJobList = jobList.sort((a, b) => {
    if(a.time < b.time) return -1
    if(a.time > b.time) return 1
    return 0
  })

  fs.writeFileSync('jobList.json', JSON.stringify(newJobList))
}

const insertDataWorker = async (data) => {
  testDb = JSON.parse(fs.readFileSync('testDb.json'))
  testDb.push(data)
  fs.writeFileSync('testDb.json', JSON.stringify(testDb))
}

module.exports = {
  get,
  insert
}