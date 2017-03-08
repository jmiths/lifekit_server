/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emergency', {
    emergencyid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'userid'
      }
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    started_at: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ended_at: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'emergency'
  });
};
