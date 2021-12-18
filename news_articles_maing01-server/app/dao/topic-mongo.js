"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TopicMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, id: 1 });
    await super.createIndex({ awid: 1, name: 1 });
  }

  async list(awid, id, pageInfo) {
    return await super.find({awid}, id, pageInfo)
  }

  async delete(awid, id) {
    let filter = {
      awid,
      id
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

  async getByName(awid, name) {
    let filter = {
      awid,
      name
    };
    return await super.find(filter);
  }

  async get(awid, id) {
    let filter = {
      awid,
      id
    };
    return await super.findOne(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

}

module.exports = TopicMongo;
