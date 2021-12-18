"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },
  listUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },
};

class TopicAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("articlesMain");
    this.topicDao = DaoFactory.getDao("topic");
    this.articleDao = DaoFactory.getDao("article");
  }

  async list(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 Validation of dtoIn.
    let validationResult = this.validator.validate("topicListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    if (!dtoIn.pageInfo) {
      dtoIn.pageInfo = {};
    }
    if (!dtoIn.pageInfo.pageIndex) {
      dtoIn.pageInfo.pageIndex = 0;
    }
    if (!dtoIn.pageInfo.pageSize) {
      dtoIn.pageInfo.pageSize = 1000;
    }

    // HDS 2 System checks existence and state of the articlesMain uuObject.

    const articlesMain = await this.mainDao.getByAwid(awid);

    if (!articlesMain) {
      throw new Errors.List.ArticlesMainDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (articlesMain.state !== "active") {
      throw new Errors.List.ArticlesMainIsNotInProperState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: articlesMain.state }
      );
    }

    // HDS 3

    let topicList = await this.topicDao.list(awid, dtoIn.pageInfo);

    // HDS 4 Returns properly filled dtoOut.

    return {
      ...topicList,
      uuAppErrorMap,
    };
  }

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 data validation

    const validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 2 check state and existence

    const articlesMain = await this.mainDao.getByAwid(awid);

    if (!articlesMain) {
      throw new Errors.Create.ArticlesMainDoesNotExist({ uuAppErrorMap }, awid);
    }

    if (articlesMain.state !== "active") {
      throw new Errors.Create.ArticlesMainIsNotInCorrectState(
        { uuAppErrorMap },
        { awid: awid, currentState: articlesMain.state, expectedState: "active" }
      );
    }

    // HDS 3 - create
    let topic = null;
    let uuObject = { ...dtoIn, awid };

    try {
      topic = await this.topicDao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.NewspaperDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4 return

    return {
      ...topic,
      uuAppErrorMap,
    };
  }
}

module.exports = new TopicAbl();
