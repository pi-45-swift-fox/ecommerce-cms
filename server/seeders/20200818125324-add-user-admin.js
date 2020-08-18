'use strict';
const bcrypt = require("bcryptjs");

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
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("1234", salt);
    await queryInterface.bulkInsert('Users', [{email: "admin@email.com", password: hash, role: "admin", createdAt: new Date(), updatedAt: new Date()}]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
