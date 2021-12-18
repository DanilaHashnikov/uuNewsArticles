//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-app";

import NewspaperContext from "../newspaper/contextNewspaper/newspaper-context";
import DataItemStateResolver from "../../common/data-item-state-resolver";
import Config from "../config/config";
import NewspapersLoader from "../newspaper/newspapers-loader";
import NewspapersContent from "./newspapers-content";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Newspapers",
  //@@viewOff:static
};

const Newspapers = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <NewspapersLoader>
        <NewspaperContext.Consumer>
          {(dataNewspaperResult) => {
            return (
              <DataItemStateResolver dataItem={dataNewspaperResult}>
                <NewspapersContent />
              </DataItemStateResolver>
            );
          }}
        </NewspaperContext.Consumer>
      </NewspapersLoader>
    );
    //@@viewOff:render
  },
});

export default Newspapers;
