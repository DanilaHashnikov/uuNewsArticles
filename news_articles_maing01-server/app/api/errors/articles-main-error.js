"use strict";
const ArticlesMainUseCaseError = require("./articles-main-use-case-error.js");

const Init = {
  UC_CODE: `${ArticlesMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },

  ArticlesMainCreateDaoFailed : class extends ArticlesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}articlesMainCreateDaoFailed`;
      this.message = "articlesMainCreateDaoFailed";
    }
  }
};

module.exports = {
  Init,
};
