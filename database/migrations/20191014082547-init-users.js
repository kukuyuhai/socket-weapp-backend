'use strict';
const shortid = require('shortid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, STRING, UUID, DATE } = Sequelize;
    await queryInterface.createTable('users', {
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
      underscored: true,
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('users');
  },
};
