'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userName: { type: STRING(255), field: 'user_name' },
    password: STRING(255),
  });

  User.associate = () => {
    app.model.User.belongsToMany(app.model.Project, {
      through: app.model.Member,
      foreignKey: 'memberId',
      otherKey: 'projectId',
    });
    app.model.User.belongsTo(app.model.Member, {
      foreignKey: 'id',
      targetKey: 'memberId',
    });
  };

  return User;
};
