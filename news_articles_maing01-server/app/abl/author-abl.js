"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/author-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },
  listUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },
};

class AuthorAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("articlesMain");
    this.authorDao = DaoFactory.getDao("author");
    this.articleDao = DaoFactory.getDao("article");
  }

  async list(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 Validation of dtoIn.
    let validationResult = this.validator.validate("authorListDtoInType", dtoIn);
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

    let topicList = await this.authorDao.list(awid, dtoIn.id, dtoIn.pageInfo);

    // HDS 4 Returns properly filled dtoOut.

    return {
      ...topicList,
      uuAppErrorMap,
    };
  }

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 data validation

    const validationResult = this.validator.validate("authorCreateDtoInType", dtoIn);

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
    let author = null;
    let uuObject = { ...dtoIn, awid };

    try {
      author = await this.authorDao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.AuthorDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4 return the author

    return {
      ...author,
      uuAppErrorMap,
    };
  }
}

module.exports = new AuthorAbl();
