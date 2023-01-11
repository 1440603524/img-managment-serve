'use strict';

const { Controller } = require('egg');

class MemberController extends Controller {
  // 查询项目成员列表
  async memberList() {
    const { ctx } = this;
    const { projectId } = ctx.query;
    const { userName } = ctx.request.body;
    const result = await ctx.service.member.findList(projectId);
    console.log(result);
    if (result) {
      result.sort((a, b) => b.status - a.status);
      result.splice(result.findIndex(item => item.userName === userName), 1);
      ctx.body = {
        code: 200,
        data: result,
        message: '查询成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      message: '服务出错，请稍后再试',
    };
  }

  // 增加项目成员
  async addMember() {
    const { ctx } = this;
    const { memberId, projectId, memberName } = ctx.request.body;
    const result = await ctx.service.member.add({ memberId, projectId, memberName });
    if (result) {
      ctx.body = {
        code: 200,
        message: '添加成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      message: '服务出错，请稍后再试',
    };
  }

  // 删除项目成员
  async deleteMember() {
    const { ctx } = this;
    const { memberId, projectId } = ctx.request.body;
    const result = await ctx.service.member.delete({ memberId, projectId });
    if (result) {
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

  // 查询项目成员
  async findMember() {
    const { ctx } = this;
    const { projectId, memberName } = ctx.request.body;
    const result = await ctx.service.member.findOneByName(memberName, projectId);
    if (result) {
      ctx.body = {
        code: 200,
        data: result,
        message: '查询成功',
      };
      return;
    }
    ctx.body = {
      code: 400,
      message: '用户不存在',
    };
  }
}

module.exports = MemberController;
