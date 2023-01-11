'use strict';

const { Service } = require('egg');

class MemberService extends Service {
  async findList(id) {
    const { app } = this;
    return await app.model.User.findAll({
      attributes: ['id', 'member.status', 'userName'],
      include: {
        model: app.model.Member,
        attributes: [],
        where: {
          projectId: id,
        },
        required: false,
      },
      raw: true,
    });
  }

  async add(param) {
    const { app } = this;
    const { memberId, projectId, memberName } = param;
    return await app.model.Member.create(
      {
        memberId,
        projectId,
        memberName,
        status: 1,
      }
    );
  }

  async delete(param) {
    const { app } = this;
    const { memberId, projectId } = param;
    const member = await app.model.Member.findOne(
      {
        where: {
          memberId,
          projectId,
        },

      }
    );
    return await member.destroy();
  }

  async findOneByName(memberName, projectId) {
    const { app } = this;
    return await app.model.User.findOne({
      where: {
        userName: memberName,
      },
      attributes: ['id', 'member.status', 'userName'],
      include: {
        model: app.model.Member,
        attributes: [],
        where: {
          projectId,
        },
        required: false,
      },
      raw: true,
    });
  }
}

module.exports = MemberService;
