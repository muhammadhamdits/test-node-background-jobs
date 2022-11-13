const BackgroundJob = require('../models').BackgroundJob
const User = require('../models').User
const { getRandomInt } = require('./randomGenerator')

const get = async () => User.findAll()

const create = async (data) => {
  const randomTime = new Date().getTime() + getRandomInt(60) * 1000
  const arguments = JSON.stringify(data)
  addJob('createUserWorker', arguments, randomTime)
}

const addJob = (worker, arguments, time) => {
  BackgroundJob.create({ worker, arguments, time, state: 'pending' })
}

const getPendingJobs = async () => {
  let pendingJobs = await BackgroundJob.findAll({
    where: { state: 'pending' },
    order: [['time', 'ASC']]
  })
  pendingJobs = pendingJobs.filter((job) => job.time <= new Date().getTime())

  return pendingJobs
}

const executeJob = async (job) => {
  stringJob = `${job.worker}(${JSON.stringify(job.arguments)})`
  eval(stringJob)
}

const createUserWorker = async (arguments) => {
  params = JSON.parse(arguments)
  await User.create(params)
}

module.exports = {
  get,
  create,
  getPendingJobs,
  executeJob
}