const sequelize = require("../config/sequelize.config");
const { Model, DataTypes } = require("sequelize");

class Member extends Model {}

Member.init({
  name: {
    type: DataTypes.STRING(120),
    allowNull: false,
    validate: { notEmpty: true, len: [2, 120] },
  },
  role: {
    type: DataTypes.STRING(40),
    allowNull: false,
    validate: { notEmpty: true },
  },
}, {
  sequelize,
  modelName: "Member",
  tableName: "members",
  timestamps: true,
});

module.exports = { Member };