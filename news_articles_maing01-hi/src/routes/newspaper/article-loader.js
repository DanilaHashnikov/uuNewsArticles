//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import ArticleContext from "./contextArticle/article-context";

import Calls from "calls";
import Config from "../../bricks/config/config.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Author",
  //@@viewOff:statics
};

export const ArticleLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render

  render(props) {
    const dataItemResult = useDataList({
      handlerMap: {
        load: Calls.listArticle,
        create: Calls.createArticle,
      },
      itemHandlerMap: {
        update: Calls.updateArticle,
        delete: Calls.deleteArticle,
      },
    });

    return <ArticleContext.Provider value={dataItemResult}>{props.children}</ArticleContext.Provider>;
  },
  //@@viewOff:render
});

export default ArticleLoader;
