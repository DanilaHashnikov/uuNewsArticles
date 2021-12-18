//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../config/config";
import useNewspaper from "../newspaper/contextNewspaper/use-newspaper";
import NewspaperTile from "./newspaper-tile";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "NewspapersContent",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const NewspapersContent = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { data } = props;

    const { data: dataNewspaper } = useNewspaper();

    //@@viewOn:private

    // async function handleDeleteItem() {
    //   await item?.handlerMap?.delete({ id: item.data.id, forceDelete: useCheckBoxState });
    // }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <Uu5Tiles.ControllerProvider data={dataNewspaper}>
        <Uu5Tiles.ActionBar searchable={false} />
        <Uu5Tiles.FilterBar />
        <Uu5Tiles.SorterBar />
        <Uu5Tiles.Grid tileMinWidth={2000} tileMaxWidth={2000} tileSpacing={0} rowSpacing={0}>
          <NewspaperTile dataId={data} />
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

export default NewspapersContent;
