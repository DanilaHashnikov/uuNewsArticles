"use strict";

const ArticlesMainUseCaseError = require("./articles-main-use-case-error.js");
const AUTHOR_ERROR_PREFIX = `${ArticlesMainUseCaseError.ERROR_PREFIX}author/`;

const Create = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}create/`,

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

  AuthorIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}authorIsNotInCorrectState`;
      this.message = "NewAuthor is not in correct state.";
    }
  },

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  AuthorDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}authorDoesNotExist`;
      this.message = "Author does not exist.";
    }
  },

  AuthorDaoCreateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}authorDaoCreateFailed`;
      this.message = "Update author by author Dao update failed.";
    }
  },

};

const List = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}list/`,

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
