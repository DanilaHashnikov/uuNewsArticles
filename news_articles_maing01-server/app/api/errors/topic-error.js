"use strict";

const ArticlesMainUseCaseError = require("./articles-main-use-case-error.js");
const TOPIC_ERROR_PREFIX = `${ArticlesMainUseCaseError.ERROR_PREFIX}topic/`;

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,

  ArticlesMainDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}articlesMainDoesNotExist`;
      this.message = "The application is not in proper state.";
    }
  },

  ArticlesMainIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}articlesMainIsNotInCorrectState`;
      this.message = "The application is not in proper state.";
    }
  },

  NewTopicIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newsArticlesIsNotInCorrectState`;
      this.message = "NewTopic is not in correct state.";
    }
  },

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TopicDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  },

  TopicDaoCreateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDaoCreateFailed`;
      this.message = "Update topic by topic Dao update failed.";
    }
  },
};

const List = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.	";
    }
  },

  ArticlesMainDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}articlesMainDoesNotExist`;
      this.message = "articlesMain does not exist.";
    }
  },
  ArticlesMainIsNotInProperState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}articlesMainIsNotInProperState`;
      this.message = "The application is not in proper state.";
    }
  },

};

module.exports = {
  List,
  Create
};
