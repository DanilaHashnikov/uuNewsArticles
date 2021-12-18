"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/newspaper-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },

  getUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },

  updateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },

  listUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },
};

class NewspaperAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("articlesMain");
    this.newspaperDao = DaoFactory.getDao("newspaper");
    this.articleDao = DaoFactory.getDao("article");
  }

  async delete(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1

    const articlesMain = await this.mainDao.getByAwid(awid);

    if (!articlesMain) {
      throw new Errors.Delete.NewsArticlesDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (articlesMain.state !== "active") {
      throw new Errors.Delete.NewsArticlesIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTodosMain.state }
      );
    }

    // HDS 2

    let validationResult = this.validator.validate("newspaperDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // HDS 3

    let uuObject = await this.newspaperDao.get(awid, dtoIn.id);
    if (!uuObject) {
      throw new Errors.Delete.NewspaperDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 4
    let uuArticles = await this.articleDao.listByNewspaperId(awid, dtoIn.id);

    console.log("***", uuArticles);

    const {
      itemList: [article],
    } = uuArticles;
    await this.articleDao.deleteMany(awid, article?.newspaperId);

    // HDS 5
    try {
      await this.newspaperDao.delete(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.NewspaperDeleteFailed({ uuAppErrorMap }, e);
    }

    // HDS 5 Returns properly filled dtoOut.
    return {
      uuAppErrorMap,
    };
  }

  async update(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    // HDS 1 - Validation of dtoIn.

    const validationResult = this.validator.validate("newspaperUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // HDS 2 - System checks the existence and state of the todoInstance uuObject.

    const todoInstance = await this.mainDao.getByAwid(awid);

    if (!todoInstance) {
      throw new Errors.Update.newsArticlesDoesNotExist({ uuAppErrorMap }, { awid: awid });
    }

    if (todoInstance.state !== "active") {
      throw new Errors.Update.newsArticlesIsNotInCorrectState(
        { uuAppErrorMap },
        { awid: awid, currentState: todoInstance.state, expectedState: "active" }
      );
    }

    // HDS 3 Loads the Newspaper uuObject according to dtoIn.id (by newspaper DAO get).

    let newspaper = await this.newspaperDao.get(awid, dtoIn.id);

    if (!newspaper) {
      throw Errors.Update.newspaperDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 4

    const uuObject = { ...dtoIn, awid };

    // HDS 5 - System updates

    try {
      newspaper = await this.newspaperDao.update(uuObject);
    } catch (err) {
      throw new Errors.Update.NewspaperDaoUpdateFailed({ uuAppErrorMap }, err);
    }

    // HDS 6 - return
    return {
      ...newspaper,
      uuAppErrorMap,
    };
  }

  async get(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 data validation

    const validationResult = this.validator.validate("newspaperGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // HDS 2 check state and existence

    const todoInstance = await this.mainDao.getByAwid(awid);

    if (!todoInstance) {
      throw new Errors.Get.todoInstanceDoesNotExist({ uuAppErrorMap }, awid);
    }

    if (todoInstance.state !== "active") {
      throw new Errors.Get.todoInstanceIsNotInProperState(
        { uuAppErrorMap },
        { awid: awid, currentState: todoInstance.state, expectedState: "active" }
      );
    }

    // HDS 3

    const newspaper = await this.newspaperDao.get(awid, dtoIn.id);
    if (!newspaper) {
      throw new Errors.Get.NewspaperDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 4
    return {
      ...newspaper,
      uuAppErrorMap,
    };
  }

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 data validation

    const validationResult = this.validator.validate("newspaperCreateDtoInType", dtoIn);

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
    let newspaper = null;
    let uuObject = { ...dtoIn, awid };

    try {
      newspaper = await this.newspaperDao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.NewspaperDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4 return

    return {
      ...newspaper,
      uuAppErrorMap,
    };
  }

  async list(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 Validation of dtoIn.

    let validationResult = this.validator.validate("newspaperListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // HDS 2 System checks existence and state of the todoInstance uuObject.

    const articlesMain = await this.mainDao.getByAwid(awid);

    if (!articlesMain) {
      throw new Errors.List.NewsArticlesDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (articlesMain.state !== "active") {
      throw new Errors.List.NewsArticlesIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: articlesMain.state }
      );
    }

    // HDS 3

    const uuArticleList = await this.newspaperDao.list(awid);
    // HDS 4 Returns properly filled dtoOut.
    return {
      ...uuArticleList,
      uuAppErrorMap,
    };
  }
}

module.exports = new NewspaperAbl();
