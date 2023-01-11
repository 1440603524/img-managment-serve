'use strict';

const { Controller } = require('egg');

class ProjectController extends Controller {
  // 新增项目
  async addProject() {
    const { ctx } = this;
    const { projectName, projectDesc, userName } = ctx.request.body;
    if (projectName === '') {
      ctx.body = {
        code: 400,
        message: '项目名不能为空',
      };
    }
    const exist = await ctx.service.project.findOneByName(projectName);
    if (exist) {
      ctx.body = {
        code: 400,
        message: '项目已存在',
      };
      return;
    }
    const project = await ctx.service.project.add({
      projectName,
      projectDesc,
      time: new Date().getTime(),
      ownerName: userName,
    });
    if (project) {
      ctx.body = {
        code: 200,
        message: '新增项目成功',
      };
    }
  }

  // 获取最近项目
  async recentProject() {
    const { ctx } = this;
    const projectList = await ctx.service.project.findRecentList();
    if (projectList.length) {
      ctx.body = {
        code: 200,
        data: projectList,
        message: '查询成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      message: '服务出错，请稍后再试',
    };
  }

  // 项目名字列表
  async projectNameList() {
    const { ctx } = this;
    const { myList } = ctx.query;
    const { userName } = ctx.request.body;
    let projectNameList = [];
    if (myList === 'true') {
      projectNameList = await ctx.service.project.findProjectNameList(userName);
    } else {
      projectNameList = await ctx.service.project.findProjectNameList();
    }
    if (projectNameList.length) {
      ctx.body = {
        code: 200,
        data: projectNameList,
        message: '查询成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      data: [],
      message: '服务出错，请稍后再试',
    };
  }

  // 查询项目列表
  async projectList() {
    const { ctx } = this;
    const { userName } = ctx.request.body;
    const projectList = await ctx.service.project.findProjectList({ ...ctx.query, userName });
    if (projectList.length) {
      ctx.body = {
        code: 200,
        data: projectList,
        message: '查询成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      message: '服务出错，请稍后再试',
    };
  }

  // 编辑项目
  async editProject() {
    const { ctx } = this;
    const { userName, projectName } = ctx.request.body;
    delete ctx.request.body.userName;

    if (projectName === '') {
      ctx.body = {
        code: 400,
        message: '项目名不能为空',
      };
    }
    const newData = await ctx.service.project.edit({ ...ctx.request.body, editorName: userName, updateAt: new Date().getTime() });
    if (newData) {
      ctx.body = {
        code: 200,
        message: '编辑成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      message: '服务出错，请稍后再试',
    };
  }

  // 删除项目
  async deleteProject() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const deleteSuccess = await ctx.service.project.delete(id);
    if (deleteSuccess) {
      ctx.body = {
        code: 200,
        message: '删除成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      message: '服务出错，请稍后再试',
    };
  }
}

module.exports = ProjectController;
