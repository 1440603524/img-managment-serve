'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const File = app.model.define('file', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    fileName: { type: STRING(255), field: 'file_name' },
    fileType: { type: STRING(255), field: 'file_type' },
    updateAt: { type: STRING(255), field: 'update_at' },
    createAt: { type: STRING(255), field: 'create_at' },
    creatorName: { type: STRING(255), field: 'creator_name' },
    editorName: { type: STRING(255), field: 'editor_name' },
    projectName: { type: STRING(255), field: 'project_name' },
    fileUrl: { type: STRING(255), field: 'file_url' },
  });

  return File;
};
