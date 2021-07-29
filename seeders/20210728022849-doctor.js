'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let doctorData = require('../data/doctor.json')
   doctorData = doctorData.map(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
      return el
   })
   return queryInterface.bulkInsert('Doctors', doctorData, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Doctors', null, {})
  }
};
