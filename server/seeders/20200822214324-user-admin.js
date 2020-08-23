'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let encryptPwd = bcrypt.hashSync('1234',10)
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password:encryptPwd,
      role:'admin',
      createdAt :new Date(),
      updatedAt :new Date()
   }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users',  null, {});
  }
};
