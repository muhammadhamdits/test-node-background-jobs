'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class BackgroundJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BackgroundJob.init({
    worker: DataTypes.STRING,
    arguments: DataTypes.STRING,
    time: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'BackgroundJob',
  })
  return BackgroundJob
}