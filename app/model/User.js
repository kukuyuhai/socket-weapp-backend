
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    city: STRING(64),
    created_at: DATE,
    updated_at: DATE,
  });

  User.findByIdwithUser = async function(id, userId) {
    return await this.findOne({
      where: { id, user_id: userId },
    });
  };

  return User;
};
