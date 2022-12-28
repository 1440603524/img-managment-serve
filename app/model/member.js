'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Member = app.model.define('member', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    projectId: { type: INTEGER, field: 'project_id' },
    memberId: { type: INTEGER, field: 'member_id' },
    memberName: { type: STRING(255), field: 'member_name' },
    status: { type: STRING(255), field: 'status' },
  });

  Member.associate = () => {
    app.model.Member.hasMany(app.model.User, {
      foreignKey: 'id',
      targetKey: 'memberId',
    });
    app.model.Member.belongsTo(app.model.Project, {
      foreignKey: 'projectId',
      targetKey: 'id',
    });
  };

  return Member;
};
