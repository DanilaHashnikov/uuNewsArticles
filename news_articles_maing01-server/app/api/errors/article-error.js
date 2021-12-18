"use strict";

const ArticlesMainUseCaseError = require("./articles-main-use-case-error.js");
const ARTICLE_ERROR_PREFIX = `${ArticlesMainUseCaseError.ERROR_PREFIX}article/`;

const Create = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  NewsArticlesDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newsArticlesDoesNotExist`;
      this.message = "NewsArticles does not exist.";
    }
  },

  NewsArticlesIsNotInCorrectState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newsArticlesIsNotInCorrectState`;
      this.message = "NewsArticles is not in correct state.";
    }
  },

  TopicDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDoesNotExist`;
      this.message = "One or more topics with given topicId do not exist.";
    }
  },

  AuthorDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}authorDoesNotExist`;
      this.message = "Author does not exist.";
    }
  },

  NewspaperDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDoesNotExist`;
      this.message = "Newspaper does not exist.";
    }
  },

  ArticleDaoCreateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}articleDaoCreateFailed`;
      this.message = "Create article by article DAO create failed.";
    }
  },

  NewspaperDaoUpdateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDaoUpdateFailed`;
      this.message = "Update newspaper by newspaper DAO update failed.";
    }
  },
};

const List = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}list/`,

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

const Delete = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ArticlesMainDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}articlesMainDoesNotExist`;
      this.message = "articlesMain does not exist.";
    }
  },

  ArticlesMainIsNotInProperState: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}articlesMainIsNotInProperState`;
      this.message = "articlesMain is not in correct state.";
    }
  },

  ArticleDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}articleDoesNotExist`;
      this.message = "Article does not exist.";
    }
  },
};

const Update = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  NewsArticlesDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newsArticlesDoesNotExist`;
      this.message = "NewsArticles does not exist.";
    }
  },
  ArticleDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}articleDoesNotExist`;
      this.message = "Article does not exist.";
    }
  },
  AuthorDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}AuthorDoesNotExist`;
      this.message = "\tAuthor does not exist.";
    }
  },
  NewspaperDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDoesNotExist`;
      this.message = "Newspaper does not exist.";
    }
  },
  NewspaperDaoUpdateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDaoUpdateFailed`;
      this.message = "Update newspaper by newspaper DAO update failed.";
    }
  },
  TopicDoesNotExist: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}topicDoesNotExist`;
      this.message = "One or more topics with given topicId do not exist.";
    }
  },
  ArticleDaoUpdateFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}articleDaoUpdateFailed`;
      this.message = "Update article by article Dao update failed.";
    }
  },

};

module.exports = {
  Update,
  Delete,
  List,
  Create,
};
