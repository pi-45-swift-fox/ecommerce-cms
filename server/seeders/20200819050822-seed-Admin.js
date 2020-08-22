'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const Administrator = {
  email: 'admin@mail.com',
  password: hashPassword('1234'),
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [Administrator], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
