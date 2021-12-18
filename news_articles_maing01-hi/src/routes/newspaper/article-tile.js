//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
import useTopic from "./context/use-topic";
import {
  ArticleUpdateControls,
  ArticleUpdateForm,
  ArticleUpdateHeader,
} from "./article-update-form/article-update-form";
import { useContextModal } from "../../common/modal-manager";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleTile",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ArticleTile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const { data: dataTopic } = useTopic();
    const [open, close, showAlert] = useContextModal();
    //@@viewOff:hooks

    //@@viewOn:private
    function handleOpenUpdateModalModal() {
      open({
        header: <ArticleUpdateHeader />,
        content: <ArticleUpdateForm closeModal={close} showAlert={showAlert} />,
        footer: <ArticleUpdateControls />,
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div>
        <UU5.Bricks.Card className="uu5-common-padding-s" colorSchema="green">
          <UU5.Bricks.Button onClick={handleOpenUpdateModalModal}>Update</UU5.Bricks.Button>
          <UU5.Bricks.Row />
          <UU5.Bricks.Link>{JSON.stringify(props.data.data.name)}</UU5.Bricks.Link>
          <UU5.Bricks.Row>{JSON.stringify("Topic")}</UU5.Bricks.Row>
          <UU5.Bricks.Row>Author</UU5.Bricks.Row>
          <UU5.Bricks.Row>Publication date</UU5.Bricks.Row>
        </UU5.Bricks.Card>
      </div>
    );
    //@@viewOff:render
  },
});

export default ArticleTile;
