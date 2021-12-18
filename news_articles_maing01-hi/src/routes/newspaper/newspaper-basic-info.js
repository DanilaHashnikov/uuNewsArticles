//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";

import Config from "../config/config";
import {
  ArticleUpdateControls,
  ArticleUpdateForm,
  ArticleUpdateHeader,
} from "./article-update-form/article-update-form";
import { useContextModal } from "../../common/modal-manager";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "NewspaperBasicInfo",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const NewspaperBasicInfo = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { dataNewspaper, newspaperHandlerMap } = props;

    //@@viewOn:hooks
    const [open, close, showAlert] = useContextModal();
    console.log("newspaper-basic", props.newspaperHandlerMap);
    //@@viewOff:hooks
    //@@viewOn:private
    const handleNewspaperDelete = () => {
      props.newspaperHandlerMap.delete();
    };

    function handleOpenEditModal() {
      open({
        header: <ArticleUpdateHeader />,
        content: (
          <ArticleUpdateForm
            newspaperHandlerMap={props.newspaperHandlerMap}
            dataNewspaper={props.dataNewspaper}
            closeModal={close}
            showAlert={showAlert}
          />
        ),
        footer: <ArticleUpdateControls />,
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    // const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    return (
      <UU5.Bricks.Container>
        <UU5.Bricks.Button onClick={handleNewspaperDelete}>Delete</UU5.Bricks.Button>
        <UU5.Bricks.Button onClick={handleOpenEditModal}>Edit</UU5.Bricks.Button>
        <UU5.Bricks.Header>{props.dataNewspaper.name}</UU5.Bricks.Header>
        <UU5.Bricks.Row>{props.dataNewspaper.creationDate}</UU5.Bricks.Row>
        <UU5.Bricks.Row>{props.dataNewspaper.articlesCount}</UU5.Bricks.Row>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default NewspaperBasicInfo;
