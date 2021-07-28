'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.Hospital, { foreignKey : 'HospitalId' })
      Doctor.belongsTo(models.Specialist, { foreignKey : 'SpecialistId' })
    }
  };
  Doctor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    age: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    SpecialistId: DataTypes.INTEGER,
    HospitalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};