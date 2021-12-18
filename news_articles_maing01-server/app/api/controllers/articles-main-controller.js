"use strict";
const ArticlesMainAbl = require("../../abl/articles-main-abl.js");

class ArticlesMainController {
  init(ucEnv) {
    return ArticlesMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new ArticlesMainController();
