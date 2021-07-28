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
   let hospitalData = require('../data/hospital.json')
   hospitalData = hospitalData.map(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
      return el
   })
   return queryInterface.bulkInsert('Hospitals', hospitalData, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Hospitals', null, {})
  }
};
