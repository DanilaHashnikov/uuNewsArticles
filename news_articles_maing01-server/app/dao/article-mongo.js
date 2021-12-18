"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ArticleMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, newspaperId: 1, publicationDate: 1 });
    await super.createIndex({ awid: 1, newspaperId: 1, authorId: 1 });
    await super.createIndex({ awid: 1, newspaperId: 1, topicIdList: 1 });
    await super.createIndex({ awid: 1, publicationDate: 1 });
    await super.createIndex({ awid: 1, authorId: 1 });
    await super.createIndex({ awid: 1, newspaperId: 1 });
    await super.createIndex({ awid: 1, topicIdList: 1 });
  }

  async listByNewspaperIdAndDate(awid, newspaperId, publicationDate, sortBy, order, pageInfo) {
    let filter = {
      awid,
      newspaperId,
      publicationDate,
      sortBy,
      order,
      pageInfo,
    };
    return await super.find(filter);
  }

  async listByNewspaperIdAndAuthorId(awid, newspaperId, authorId, sortBy, order, pageInfo) {
    let filter = {
      awid,
      newspaperId,
      authorId,
      sortBy,
      order,
      pageInfo,
    };
    return await super.find(filter);
  }

  async listByNewspaperIdAndTopicIdList(awid, newspaperId, topicIdList, sortBy, order, pageInfo) {
    let filter = {
      awid,
      newspaperId,
      topicIdList,
      sortBy,
      order,
      pageInfo,
    };
    return await super.find(filter);
  }

  async listByPublicationDate(awid, publicationDate, sortBy, order, pageInfo) {
    let filter = {
      awid,
      publicationDate,
      sortBy,
      order,
      pageInfo,
    };
    return await super.find(filter);
  }

  async listByAuthorId(awid, authorId, sortBy, order, pageInfo) {
    let filter = {
      awid,
      authorId,
      sortBy,
      order,
      pageInfo,
    };
    return await super.find(filter);
  }

  async listByNewspaperId(awid, newspaperId, pageInfo = {}) {
    let filter = {
      awid,
      newspaperId,
    };
    return await super.find(filter, pageInfo);
  }

  async listWithoutId(awid) {
    return await super.find({ awid });
  }

  async list(awid, id, pageInfo = {}) {
    let filter = {
      awid,
      id,
    };
    return await super.find(filter, pageInfo);
  }

  async delete(awid, id) {
    let filter = {
      awid,
      id,
    };
    return await super.deleteOne(filter);
  }

  async deleteMany(awid, newspaperId) {
    let filter = {
      awid,
      newspaperId,
    };
    return await super.deleteMany(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async getByNewspaperId(awid, newspaperId) {
    let filter = {
      awid,
      newspaperId,
    };
    return await super.find(filter);
  }

  async get(awid, id) {
    let filter = {
      awid,
      id,
    };
    return await super.findOne(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
}

module.exports = ArticleMongo;
