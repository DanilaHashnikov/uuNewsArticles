/**
 * Server calls of application client.
 */
import UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";

let Calls = {
  APP_BASE_URI: location.protocol + "//" + location.host + UU5.Environment.getAppBasePath(),

  async call(method, url, dtoIn, clientOptions) {
    let response = await Plus4U5.Common.Calls.call(method, url, dtoIn, clientOptions);
    return response.data;
  },

  // newspaper
  createNewspaper(dtoIn) {
    let commandUri = Calls.getCommandUri("newspaper/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  updateNewspaper(dtoIn) {
    let commandUri = Calls.getCommandUri("newspaper/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  deleteNewspaper(dtoIn) {
    let commandUri = Calls.getCommandUri("newspaper/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  listNewspaper(dtoIn) {
    let commandUri = Calls.getCommandUri("newspaper/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  getNewspaper(dtoIn) {
    let commandUri = Calls.getCommandUri("newspaper/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  // topic

  createTopic(dtoIn) {
    let commandUri = Calls.getCommandUri("topic/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  listTopic(dtoIn) {
    let commandUri = Calls.getCommandUri("topic/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  // author

  createAuthor(dtoIn) {
    let commandUri = Calls.getCommandUri("author/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  listAuthor(dtoIn) {
    let commandUri = Calls.getCommandUri("author/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  // article

  listArticle(dtoIn) {
    let commandUri = Calls.getCommandUri("article/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  createArticle(dtoIn) {
    let commandUri = Calls.getCommandUri("article/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  updateArticle(dtoIn) {
    let commandUri = Calls.getCommandUri("article/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  deleteArticle(dtoIn) {
    let commandUri = Calls.getCommandUri("article/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  loadDemoContent(dtoIn) {
    let commandUri = Calls.getCommandUri("loadDemoContent");
    return Calls.call("get", commandUri, dtoIn);
  },

  loadIdentityProfiles() {
    let commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri, {});
  },

  initWorkspace(dtoInData) {
    let commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    let commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri, {});
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  /*
  For calling command on specific server, in case of developing client site with already deployed
  server in uuCloud etc. You can specify url of this application (or part of url) in development
  configuration in *-client/env/development.json, for example:
   {
     ...
     "uu5Environment": {
       "gatewayUri": "https://uuapp.plus4u.net",
       "awid": "b9164294f78e4cd51590010882445ae5",
       "vendor": "uu",
       "app": "demoappg01",
       "subApp": "main"
     }
   }
   */
  getCommandUri(aUseCase) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    let targetUriStr = Calls.APP_BASE_URI + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    if (process.env.NODE_ENV !== "production") {
      let env = UU5.Environment;
      if (env.tid || env.awid || env.vendor || env.app) {
        let url = Plus4U5.Common.Url.parse(targetUriStr);
        if (env.tid || env.awid) {
          if (env.gatewayUri) {
            let match = env.gatewayUri.match(/^([^:]*):\/\/([^/]+?)(?::(\d+))?(\/|$)/);
            if (match) {
              url.protocol = match[1];
              url.hostName = match[2];
              url.port = match[3];
            }
          }
          if (env.tid) url.tid = env.tid;
          if (env.awid) url.awid = env.awid;
        }
        if (env.vendor || env.app) {
          if (env.vendor) url.vendor = env.vendor;
          if (env.app) url.app = env.app;
          if (env.subApp) url.subApp = env.subApp;
        }
        targetUriStr = url.toString();
      }
    }

    return targetUriStr;
  },
};

export default Calls;
