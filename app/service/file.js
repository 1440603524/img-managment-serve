'use strict';

const { Service } = require('egg');
const fs = require('fs');
const path = require('path');


class FileService extends Service {
  async add(param) {
    const { app } = this;
    const {
      projectName,
      fileName,
      createAt,
      creatorName,
      fileType,
      fileUrl,
    } = param;
    return await app.model.File.create({
      projectName,
      fileName,
      createAt,
      creatorName,
      fileType,
      fileUrl,
    });
  }

  async addOss(item, projectName, userName, id) {
    const { ctx } = this;
    const base64 = item.thumbUrl.replace(/^data:image\/\w+;base64,/, '');
    const buf = Buffer.from(base64, 'base64');
    await fs.promises.writeFile(path.normalize(`E:\\lzjworkspace\\bs\\image\\${item.name}`), buf);
    await ctx.oss.put(item.name, path.normalize(`E:\\lzjworkspace\\bs\\image\\${item.name}`));
    await fs.promises.unlink(path.normalize(`E:\\lzjworkspace\\bs\\image\\${item.name}`));
    if (id) {
      await ctx.service.file.update({
        id,
        updateAt: new Date().getTime(),
        editorName: userName,
        fileUrl: `https://file-management-tissue.oss-cn-shenzhen.aliyuncs.com/${item.name}?t=${new Date().getTime()}`,
      });
      return;
    }
    await ctx.service.file.add({
      projectName,
      fileName: item.name,
      createAt: new Date().getTime(),
      creatorName: userName,
      fileType: item.type,
      fileUrl: `https://file-management-tissue.oss-cn-shenzhen.aliyuncs.com/${item.name}`,
    });
  }

  async findOneByName(fileName) {
    const { app } = this;
    return await app.model.File.findOne({
      where: {
        fileName,
      },
      raw: true,
    });
  }

  async list(config) {
    const { app } = this;
    const { projectName, fileName, creatorName, editorName, pageSize, page } = config;
    return await app.model.File.findAndCountAll({
      raw: true,
      where: {
        ...(editorName ? { editorName } : {}),
        ...(creatorName ? { creatorName } : {}),
        ...(projectName ? { projectName } : {}),
        ...(fileName ? { fileName } : {}),
      },
      limit: parseInt(pageSize),
      offset: (page - 1) * pageSize,
    });
  }

  async jurisdiction(userName, projectName) {
    const { app } = this;
    const result = await app.model.Member.findAll({
      where: {
        memberName: userName,
      },
      include: {
        model: app.model.Project,
        attributes: [],
        where: {
          projectName,
        },
      },
      raw: true,
    });
    return result.length !== 0;
  }

  async update(param) {
    const { app } = this;
    const {
      id,
      updateAt,
      editorName,
      fileUrl,
    } = param;
    return await app.model.File.update({
      fileUrl,
      updateAt,
      editorName,
    }, {
      where: {
        id,
      },
    });
  }
}

module.exports = FileService;
