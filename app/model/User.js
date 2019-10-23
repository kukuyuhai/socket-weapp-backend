
'use strict';
const shortid = require('shortid');

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: UUID,
      defaultValue() {
        return 'wxid_' + shortid.generate();
      },
    },
    openId: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    unionId: STRING,
    nickName: STRING,
    gender: INTEGER,
    language: STRING(12),
    city: STRING,
    province: STRING,
    country: STRING,
    avatarUrl: STRING(256),
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    underscored: false,
    createdAt: 'createdAt',
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: 'updatedAt',
  });

  User.findUserbyId = async function(id) {
    return await this.findOne({
      where: { openId: id },
    });
  };

  // don't use arraw function
  User.prototype.logSignin = async function() {
    return await this.update({ updatedAt: new Date() });
  };

  return User;
};
