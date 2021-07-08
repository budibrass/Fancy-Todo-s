'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require("../helpers/bcrypt");

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
      type:  DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `email must be required`
        }
      },
      unique: true
    },
    password: {
      type:  DataTypes.STRING,
      validate: {
        len: {
          args: [6, 20],
          msg: `minimal password character is 6`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user, opt) => {
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};