"use strict";
const NewspaperAbl = require("../../abl/newspaper-abl.js");

class NewspaperController {
  delete(ucEnv) {
    return NewspaperAbl.delete(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return NewspaperAbl.update(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return NewspaperAbl.get(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return NewspaperAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return NewspaperAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new NewspaperController();
