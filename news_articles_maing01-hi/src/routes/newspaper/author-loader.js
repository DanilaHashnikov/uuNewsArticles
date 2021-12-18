//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import AuthorContext from "./contextAuthor/author-context";

import Calls from "calls";
import Config from "../../bricks/config/config.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Author",
  //@@viewOff:statics
};

export const AuthorLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render

  render(props) {
    const dataItemResult = useDataList({
      handlerMap: {
        load: Calls.listAuthor,
        create: Calls.createAuthor,
      },
    });

    return <AuthorContext.Provider value={dataItemResult}>{props.children}</AuthorContext.Provider>;
  },
  //@@viewOff:render
});

export default AuthorLoader;
