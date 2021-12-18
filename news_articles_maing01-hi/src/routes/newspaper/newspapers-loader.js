//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import NewspaperContext from "./contextNewspaper/newspaper-context";

import Calls from "calls";
import Config from "../../bricks/config/config.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "NewspapersLoader",
  //@@viewOff:statics
};

export const NewspapersLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render

  render(props) {
    const dataItemResult = useDataList({
      handlerMap: {
        load: Calls.listNewspaper,
        create: Calls.createNewspaper,
      },
      itemHandlerMap: {
        update: Calls.updateNewspaper,
        delete: Calls.deleteNewspaper,
      },
    });

    return <NewspaperContext.Provider value={dataItemResult}>{props.children}</NewspaperContext.Provider>;
  },
  //@@viewOff:render
});

export default NewspapersLoader;
