"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class NewspaperMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, id: 1 });
    await super.createIndex({ awid: 1, name: 1 });
  }

  async list(awid, pageInfo = {}) {
    let filter = {
      awid,
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
      id: newspaperId,
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

module.exports = NewspaperMongo;
