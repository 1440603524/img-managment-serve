'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Project = app.model.define('project', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    projectName: { type: STRING(255), field: 'project_name' },
    projectDesc: { type: STRING(255), field: 'project_desc' },
    updateAt: { type: STRING(255), field: 'update_at' },
    ownerName: { type: STRING(255), field: 'owner_name' },
    editorName: { type: STRING(255), field: 'editor_name' },
  });

  Project.associate = () => {
    app.model.Project.belongsToMany(app.model.User, {
      through: app.model.Member,
      foreignKey: 'projectId',
      otherKey: 'memberId',
    });
    app.model.Project.hasMany(app.model.Member, {
      foreignKey: 'projectId',
      targetKey: 'id',
    });
  };

  return Project;
};
