"use strict";
const AuthorAbl = require("../../abl/author-abl.js");

class AuthorController {

  list(ucEnv) {
    return AuthorAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return AuthorAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }

}

module.exports = new AuthorController();
