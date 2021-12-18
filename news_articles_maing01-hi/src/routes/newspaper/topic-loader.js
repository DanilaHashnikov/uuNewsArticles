//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import TopicContext from "./context/topic-context";

import Calls from "calls";
import Config from "../../bricks/config/config.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Topic",
  //@@viewOff:statics
};

export const TopicLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render

  render(props) {
    const dataItemResult = useDataList({
      handlerMap: {
        load: Calls.listTopic,
        create: Calls.createTopic,
      },
    });

    return <TopicContext.Provider value={dataItemResult}>{props.children}</TopicContext.Provider>;
  },
  //@@viewOff:render
});

export default TopicLoader;
