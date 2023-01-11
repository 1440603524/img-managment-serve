'use strict';

const { Service } = require('egg');

class ProjectService extends Service {
  async findOneByName(projectName) {
    const { app } = this;
    return await app.model.Project.findOne({
      where: {
        project_name: projectName,
      },
      raw: true,
    });
  }


  async add(data) {
    const { projectName, projectDesc, time, ownerName } = data;
    const { app } = this;
    return await app.model.Project.create({
      projectName,
      projectDesc,
      updateAt: time,
      ownerName,
    });
  }

  async findRecentList() {
    const { app } = this;
    return await app.model.Project.findAll({
      limit: 10,
      orders: [['lastEditTime', 'desc']],
      raw: true,
    });
  }

  async findProjectNameList(ownerName) {
    const { app } = this;
    console.log(ownerName);
    return ownerName ? await app.model.Project.findAll({
      where: {
        ownerName,
      },
      columns: ['id', 'projectName'],
      raw: true,
    }) : await app.model.Project.findAll({
      columns: ['id', 'projectName'],
      raw: true,
    });
  }

  async findProjectList(config) {
    const { app } = this;
    const { editorName, ownerName, projectName, pageSize, page, userName } = config;
    const projectNameList = await app.model.Project.findAll({
      where: {
        ...(editorName ? { editorName } : {}),
        ...(ownerName ? { ownerName } : {}),
        ...(projectName ? { projectName } : {}),
      },
      limit: parseInt(pageSize),
      offset: (page - 1) * pageSize,
      raw: true,
    });
    if (projectNameList) {
      projectNameList.forEach(item => {
        item.isOwner = (userName === item.ownerName);
        item.updateAt = new Date(parseInt(item.updateAt)).toLocaleString();
      });
      return projectNameList;
    }
    return [];
  }

  async edit(config) {
    const { app } = this;
    const { projectName, projectDesc, id, editorName, updateAt } = config;
    const project = await app.model.Project.findByPk(id);
    return await project.update({
      projectName,
      updateAt,
      editorName,
      projectDesc,
    });
  }

  async delete(id) {
    const { app } = this;
    const project = await app.model.Project.findByPk(id);
    return await project.destroy();
  }
}

module.exports = ProjectService;
