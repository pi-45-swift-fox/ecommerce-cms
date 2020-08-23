'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: `email should unique` },
      validate: {
        notNull: { msg: 'email required' },
        isEmail: { msg: 'invalid email' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password required'
        },
        len: {
          args: [4,15],
          msg: 'invalid length password'
        }
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      notEmpty: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};