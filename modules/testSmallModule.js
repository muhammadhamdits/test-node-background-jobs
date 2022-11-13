const BackgroundJob = require('../models').BackgroundJob
const User = require('../models').User
const { getRandomInt } = require('./randomGenerator')
const now = new Date().getTime()

const get = async () => User.findAll()

const create = async (data) => {
  const randomTime = now + getRandomInt(60) * 1000
  const arguments = JSON.stringify(data)
  addJob('createUserWorker', arguments, randomTime)
}

const addJob = async (worker, arguments, time) => {
  job = await BackgroundJob.create({ worker, arguments, time })
  executeJob(job)
}

const executeJob = async (job) => {
  stringJob = `${job.worker}(${JSON.stringify(job.arguments)})`
  diffTime = getDiffTime(job.time)
  
  if (diffTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, diffTime))
  }
  
  eval(stringJob)
}

const createUserWorker = async (arguments) => {
  params = JSON.parse(arguments)
  await User.create(params)
  await BackgroundJob.destroy({ where: { id: job.id } })
}

const getDiffTime = (time) => time - now

module.exports = {
  get,
  create
}