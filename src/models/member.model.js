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
    defaultValue: 'Member', // <- default to avoid null
    validate: { notEmpty: true },
  },
  // If you use auth, keep these in the model.
  // If they are already present in your file, keep your existing version.
  email: {
    type: DataTypes.STRING(150),
    allowNull: true, // keep nullable so seeding works without email
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // keep nullable so seeding works without password
  },
}, {
  sequelize,
  modelName: "Member",
  tableName: "members",
  timestamps: true,
});

module.exports = { Member };