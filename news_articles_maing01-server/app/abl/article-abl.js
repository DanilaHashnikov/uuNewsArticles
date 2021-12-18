"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/article-error.js");

const WARNINGS = {
  updateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },

  listUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },

  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}DtoIn contains unsupported keys.`,
  },

  listNewspaperDoesNotExist: {
    code: `${Errors.Create.UC_CODE}Newspaper does not exist.`,
  },

  listAuthorDoesNotExist: {
    code: `${Errors.Create.UC_CODE}Author does not exist.`,
  },

  articlesWithSpecifiedPublicationDateDoNotExist: {
    code: `${Errors.Create.UC_CODE}\tArticles with specified publicationDate do not exist.`,
  },

  newspaperDoesNotExist: {
    code: `${Errors.Create.UC_CODE}\tNewspaper does not exist.`,
  },

  someTopicsDoNotExist: {
    code: `${Errors.Create.UC_CODE}Some topics do not exist.`,
  },

  topicsDoNotExist: {
    code: `${Errors.Create.UC_CODE}Topics do not exist.`,
  },
};

class ArticleAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("articlesMain");
    this.newspaperDao = DaoFactory.getDao("newspaper");
    this.topicDao = DaoFactory.getDao("topic");
    this.authorDao = DaoFactory.getDao("author");
    this.articleDao = DaoFactory.getDao("article");
  }

  async update(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    // HDS 1

    const articlesMain = await this.mainDao.getByAwid(awid);

    if (!articlesMain) {
      throw new Errors.Update.NewsArticlesDoesNotExist({ uuAppErrorMap }, { awid: awid });
    }

    // HDS 2

    if (articlesMain.state !== "active") {
      throw new Errors.Update.NewsArticlesIsNotInCorrectState(
        { uuAppErrorMap },
        {
          awid: awid,
          currentState: articlesMain.state,
          expectedState: "active",
        }
      );
    }

    const validationResult = this.validator.validate("articleUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // HDS 3

    let uuObject = await this.articleDao.get(awid, dtoIn.id);

    if (!uuObject) {
      throw new Errors.Update.ArticleDoesNotExist({ uuAppErrorMap }, { articleId: dtoIn.id });
    }
    // HDS 4 - Checks if the dtoIn contains key authorId.
    let author;
    if (dtoIn.authorId) {
      author = await this.authorDao.get(awid, dtoIn.authorId);
      if (!author) {
        throw new Errors.Update.AuthorDoesNotExist({ uuAppErrorMap }, { authorId: dtoIn.authorId });
      }
    }

    // HDS 5 - Checks if the dtoIn contains key newspaperId.
    let newspaper;
    if (dtoIn.newspaperId) {
      newspaper = await this.newspaperDao.get(awid, dtoIn.newspaperId);
      if (!newspaper) {
        throw new Errors.Update.NewspaperDoesNotExist({ uuAppErrorMap });
      }

      // HDS 5 A2

      newspaper.articlesCount++;
      await this.newspaperDao.update(newspaper);

      // HDS 5 A3

      let oldNewspaper = await this.newspaperDao.get(awid, uuObject.newspaperId);
      oldNewspaper.articlesCount--;
      await this.newspaperDao.update(oldNewspaper);
      uuObject.newspaperId = dtoIn.newspaperId;
    }

    // HDS 6

    let topic;
    if (!dtoIn.topicIdList) {
      topic = await this.topicDao.list(awid, dtoIn.topicIdList);
      if (!topic) {
        ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.TopicDoesNotExist, { topicIdList: dtoIn.topicIdList });
      }
    }

    // HDS 7

    uuObject = { ...dtoIn, awid };

    try {
      uuObject = await this.articleDao.update(uuObject);
    } catch (err) {
      throw new Errors.Update.ArticleDaoUpdateFailed({ uuAppErrorMap }, err);
    }

    // HDS 8 - return
    return {
      ...uuObject,
      uuAppErrorMap,
    };
  }

  async delete(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 Validation of dtoIn.
    let validationResult = this.validator.validate("articleDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // HDS 2 System checks existence and state of the todoInstance uuObject.

    const articlesMain = await this.mainDao.getByAwid(awid);

    if (!articlesMain) {
      throw new Errors.Delete.ArticlesMainDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (articlesMain.state !== "active") {
      throw new Errors.Delete.ArticlesMainIsNotInProperState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: articlesMain.state }
      );
    }

    // HDS 3

    let uuObject = await this.articleDao.get(awid, dtoIn.id);
    if (!uuObject) {
      throw new Errors.Delete.ArticleDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 4

    await this.articleDao.delete(awid, dtoIn.id);

    // HDS 5 Returns properly filled dtoOut.
    return {
      uuAppErrorMap,
    };
  }

  async list(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 Validation of dtoIn.

    let validationResult = this.validator.validate("articleListDtoInType", dtoIn);
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

    if (!dtoIn.sortBy) {
      dtoIn.sortBy = "name";
    }
    if (!dtoIn.order) {
      dtoIn.order = "asc";
    }

    let uuArticleList;
    // HDS 3
    if (dtoIn.newspaperId) {
      const uuNewspaper = await this.newspaperDao.getByNewspaperId(awid, dtoIn.newspaperId);
      uuArticleList = await this.articleDao.listByNewspaperId(awid, uuNewspaper?.itemList[0].id.toString());
      if (!uuNewspaper) {
        throw new Errors.List.NewspaperDoesNotExist({ uuAppErrorMap }, { uuNewspaper: dtoIn.newspaperId });
      }
    } else {
      uuArticleList = await this.articleDao.listWithoutId(awid);
    }

    console.log(uuArticleList);
    // HDS 4 Returns properly filled dtoOut.
    return {
      ...uuArticleList,
      uuAppErrorMap,
    };
  }

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 Checks newsArticles state.

    const articlesMain = await this.mainDao.getByAwid(awid);

    if (!articlesMain) {
      throw new Errors.Create.NewsArticlesDoesNotExist({ uuAppErrorMap }, awid);
    }

    if (articlesMain.state !== "active") {
      throw new Errors.Create.NewsArticlesIsNotInCorrectState(
        { uuAppErrorMap },
        { awid: awid, state: articlesMain.state, expectedStateList: ["active", "underConstruction"] }
      );
    }

    // HDS 2 data validation
    const validationResult = this.validator.validate("articleCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3
    // 3.A
    for (let i = 0; i < dtoIn.topicIdList.length; i++) {
      const topic = await this.topicDao.get(awid, dtoIn.topicIdList[i]);
      if (!topic) {
        ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.TopicDoesNotExist, { topic: dtoIn.topicIdList[i] });
      }
    }

    let uuObject = { ...dtoIn, awid };
    if (dtoIn.topicIdList) {
      await this.topicDao.list(awid, uuObject);
    } else {
      throw new Errors.Create.TopicDoesNotExist({ topicIdList: dtoIn.topicIdList }, { uuAppErrorMap });
    }

    // HDS 4

    if (dtoIn.authorId) {
      await this.authorDao.get(awid, uuObject.authorId);
    } else {
      throw new Errors.Create.AuthorDoesNotExist({ authorId: dtoIn.authorId }, { uuAppErrorMap });
    }

    // HDS 5

    if (dtoIn.newspaperId) {
      await this.newspaperDao.get(awid, uuObject.newspaperId);
    } else {
      throw new Errors.Create.NewspaperDoesNotExist({ newspaperId: dtoIn.newspaperId }, { uuAppErrorMap });
    }

    // HDS 6

    let uuArticle = null;
    try {
      uuArticle = await this.articleDao.create(uuObject);
    } catch (e) {
      throw new Errors.Create.ArticleDaoCreateFailed({ uuAppErrorMap }, e);
    }

    // HDS 7 For newspaperId in dtoIn increments the articlesCount attribute of the newspaper by 1 (newspaper DAO update).

    let articlesCount = await this.newspaperDao.get(awid, uuObject.newspaperId);
    articlesCount.articlesCount++;
    await this.newspaperDao.update(articlesCount);

    return {
      ...uuArticle,
      uuAppErrorMap,
    };
  }
}

module.exports = new ArticleAbl();
