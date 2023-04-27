'use strict';

const { Controller } = require('egg');


class FileController extends Controller {
  async addFile() {
    const { ctx } = this;
    const { projectName, fileList, userName } = ctx.request.body;
    if (!projectName) {
      ctx.body = {
        code: 400,
        message: '请选择项目',
      };
      return;
    }
    if (!fileList) {
      ctx.body = {
        code: 400,
        message: '上传文件为空',
      };
      return;
    }
    for (let i = 0; i < fileList.length; i++) {
      console.log(fileList[i].name);
      const res = await ctx.service.file.findOneByName(fileList[i].name);
      if (res) {
        ctx.body = {
          code: 400,
          message: '项目中已存在相同文件，请重新上传',
        };
        return;
      }
    }
    try {
      for (const item of fileList) {
        await ctx.service.file.addOss(item, projectName, userName);
      }
      ctx.body = {
        code: 200,
        message: '新增成功',
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: 400,
        message: '服务出错，请稍后再试',
      };
    }

  }

  async fileList() {
    const { ctx } = this;
    const { page, pageSize } = ctx.query;
    const { userName } = ctx.request.body;
    const result = await ctx.service.file.list({ ...ctx.query, page, pageSize });
    if (!result) {
      ctx.body = {
        code: 400,
        message: '服务出错，请稍后再试',
      };
      return;
    }
    for (const item of result.rows) {
      const jur = await ctx.service.file.jurisdiction(userName, item.projectName);
      item.isParticipate = jur || (userName === item.creatorName);
      item.createAt = new Date(parseInt(item.createAt)).toLocaleString();
      if (item.updateAt) {
        item.updateAt = new Date(parseInt(item.updateAt)).toLocaleString();
      }
    }
    ctx.body = {
      code: 200,
      data: {
        list: result.rows,
        total: result.count,
      },
      message: '查询成功',
    };
  }

  async updateFile() {
    const { ctx, app } = this;
    const { projectName, file, userName, id } = ctx.request.body;
    const oldFile = await app.model.File.findByPk(id);
    if (!file || file.thumbUrl.startsWith('https')) {
      ctx.body = {
        code: 400,
        message: '上传文件为空',
      };
      return;
    }
    if (oldFile.fileName !== file.name) {
      ctx.body = {
        code: 400,
        message: '替换文件名必须相同',
      };
      return;
    }
    try {
      await ctx.service.file.addOss(file, projectName, userName, id);
      ctx.body = {
        code: 200,
        message: '替换成功',
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: 400,
        message: '服务出错，请稍后再试',
      };
    }
  }

  async recentFile() {
    const { ctx } = this;
    const fileList = await ctx.service.file.findRecentList();
    if (fileList.length) {
      ctx.body = {
        code: 200,
        data: fileList,
        message: '查询成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      message: '服务出错，请稍后再试',
    };
  }
}

module.exports = FileController;
