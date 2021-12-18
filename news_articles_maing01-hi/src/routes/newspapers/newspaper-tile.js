//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "NewspaperTile",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const NewspaperTile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { data } = props;
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <UU5.Bricks.Card className="uu5-common-padding-s" colorSchema="green">
        <UU5.Bricks.Button
          onClick={() => {
            UU5.Environment.setRoute({
              url: { useCase: "newspaper", parameters: { id: data.data.id } },
            });
          }}
        >
          Select
        </UU5.Bricks.Button>
        <UU5.Bricks.Text>{JSON.stringify(data.data.name)}</UU5.Bricks.Text>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

export default NewspaperTile;
