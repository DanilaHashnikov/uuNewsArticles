//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import { useTopic } from "./context/context";
import Config from "../config/config";

import ArticleTile from "./article-tile";
import NewspaperBasicInfo from "./newspaper-basic-info";
import {
  ArticleCreateForm,
  ArticleCreateHeader,
  ArticleCreateControls,
} from "./article-create-form/article-create-form";
import useNewspaper from "./contextNewspaper/use-newspaper";
import useArticle from "./contextArticle/use-article";
import useAuthor from "./contextAuthor/use-author";
import { useContextModal } from "../../common/modal-manager";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleContent",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ArticleContent = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const [open, close, showAlert] = useContextModal();
    const { data: dataTopic, handlerMap: topicHandlerMap } = useTopic();
    const { data: dataNewspaper, handlerMap: newspaperHandlerMap } = useNewspaper();
    const { data: dataArticle, handlerMap: articleHandlerMap } = useArticle();
    const { data: dataAuthor, handlerMap: authorHandlerMap } = useAuthor();

    //@@viewOff:hooks

    console.log("useNewspaper", dataNewspaper);
    //@@viewOn:private

    function handleOpenCreateModal() {
      open({
        header: <ArticleCreateHeader />,
        content: <ArticleCreateForm closeModal={close} showAlert={showAlert} />,
        footer: <ArticleCreateControls />,
      });
    }

    const getActions = () => [
      {
        active: true,
        icon: "mdi-plus-circle",
        content: "Create article button",
        colorSchema: "green",
        bgStyle: "filled",
        onClick: handleOpenCreateModal,
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    return (
      <>
        <NewspaperBasicInfo dataNewspaper={dataNewspaper} newspaperHandlerMap={newspaperHandlerMap} />
        _________
        <Uu5Tiles.ControllerProvider data={dataArticle}>
          <Uu5Tiles.ActionBar searchable={false} actions={getActions()} />
          <Uu5Tiles.FilterBar />
          <Uu5Tiles.SorterBar />
          <Uu5Tiles.Grid tileMinWidth={2000} tileMaxWidth={2000} tileSpacing={0} rowSpacing={0}>
            <ArticleTile />
          </Uu5Tiles.Grid>
        </Uu5Tiles.ControllerProvider>
      </>
    );
    //@@viewOff:render
  },
});

export default ArticleContent;
