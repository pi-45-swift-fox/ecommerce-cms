'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "name must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "name must not be empty"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "You dont input any price"
        },
        notEmpty: {
          args: true,
          msg: "You dont input any price"
        },
        isInt: {
          args: true,
          msg: "price must be an integer"
        },
        notZero(value)
        {
          if (value < 0)
            throw new Error("price or stock must not be less than 0")
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "You dont input any stock"
        },
        notEmpty: {
          args: true,
          msg: "You dont input any stock"
        },
        isInt: {
          args: true,
          msg: "stock must be an integer"
        },
        notZero(value)
        {
          if (value < 0)
            throw new Error("price or stock must not be less than 0")
        }
      }
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "tags must not be empty"
        },
        notEmpty: {
          args: true,
          msg: "tags must not be empty"
        }
      }
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
