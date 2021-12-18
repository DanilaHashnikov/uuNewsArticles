"use strict";

const ArticlesMainUseCaseError = require("./articles-main-use-case-error.js");
const NEWSPAPER_ERROR_PREFIX = `${ArticlesMainUseCaseError.ERROR_PREFIX}newspaper/`;

const Create = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}create/`,

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

  NewsArticlesIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newsArticlesIsNotInCorrectState`;
      this.message = "NewsArticles is not in correct state.";
    }
  },

  CreationDateIsFromThePast: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}deadlineDateIsFromThePast`;
      this.message = "Deadline date is from the past and therefore cannot be met.";
    }
  },

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  NewspaperDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDoesNotExist`;
      this.message = "DNewspaper does not exist.";
    }
  },

  NewspaperDaoCreateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDaoCreateFailed`;
      this.message = "Update newspaper by newspaper Dao update failed.";
    }
  },
};

const Get = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}get/`,

  NewsArticlesDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newsArticlesDoesNotExist`;
      this.message = "NewsArticles does not exist.";
    }
  },

  NewsArticlesIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newsArticlesIsNotInCorrectState`;
      this.message = "NewsArticles is not in correct state.";
    }
  },

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  NewspaperDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newspaperDoesNotExist`;
      this.message = "DNewspaper does not exist.";
    }
  },
};

const Update = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}update/`,

  NewsArticlesDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newsArticlesDoesNotExist`;
      this.message = "NewsArticles does not exist.";
    }
  },

  NewsArticlesIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newsArticlesIsNotInCorrectState`;
      this.message = "NewsArticles is not in correct state.";
    }
  },

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  NewspaperDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDoesNotExist`;
      this.message = "DNewspaper does not exist.";
    }
  },

  UuBinaryCreateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },

  UuBinaryUpdateBinaryDataFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
      this.message = "Updating uuBinary data failed.";
    }
  },

  NewspaperDaoUpdateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDaoUpdateFailed`;
      this.message = "Update newspaper by newspaper Dao update failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}delete/`,

  NewsArticlesDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}newsArticlesDoesNotExist`;
      this.message = "NewsArticles does not exist.";
    }
  },

  NewsArticlesIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}newsArticlesIsNotInCorrectState`;
      this.message = "NewsArticles is not in correct state.";
    }
  },

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  NewspaperDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}newspaperDeleteFailed`;
      this.message = "Newspaper does not exist.";
    }
  },

  ArticleDeleteFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}articleDeleteFailed`;
      this.message = "Failed to delete article uuObject by article DAO delete.";
    }
  },

  NewspaperDeleteFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}newspaperDeleteFailed`;
      this.message = "Failed to delete newspaper uuObject by newspaper DAO delete.";
    }
  },
};

const List = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}list/`,

  NewsArticlesDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}newsArticlesDoesNotExist`;
      this.message = "NewsArticles does not exist.";
    }
  },

  newsArticlesIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}newsArticlesIsNotInCorrectState`;
      this.message = "NewsArticles is not in correct state.";
    }
  },

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  NewspaperDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}newspaperDoesNotExist`;
      this.message = "Newspaper does not exist.";
    }
  },
};

module.exports = {
  Delete,
  Update,
  Get,
  Create,
  List,
};
