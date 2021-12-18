//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataObject } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import NewspaperContext from "./contextNewspaper/newspaper-context";

import Calls from "calls";
import Config from "../../bricks/config/config.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "NewspaperLoader",
  //@@viewOff:statics
};

export const NewspaperLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render

  render(props) {
    const dataItemResult = useDataObject({
      handlerMap: {
        load: Calls.getNewspaper,
        create: Calls.createNewspaper,
        get: Calls.getNewspaper,
        update: Calls.updateNewspaper,
        delete: Calls.deleteNewspaper,
      },
      initialDtoIn: {
        id: props.id,
      },
    });

    return <NewspaperContext.Provider value={dataItemResult}>{props.children}</NewspaperContext.Provider>;
  },
  //@@viewOff:render
});

export default NewspaperLoader;
