"use strict";
const ArticleAbl = require("../../abl/article-abl.js");

class ArticleController {

  update(ucEnv) {
    return ArticleAbl.update(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return ArticleAbl.delete(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return ArticleAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ArticleAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }

}

module.exports = new ArticleController();
