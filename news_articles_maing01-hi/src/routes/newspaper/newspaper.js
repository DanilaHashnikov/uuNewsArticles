//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-app";

import TopicContext from "./context/topic-context";
import ArticleContext from "./contextArticle/article-context";
import AuthorContext from "./contextAuthor/author-context";
import NewspaperContext from "./contextNewspaper/newspaper-context";
import DataItemStateResolver from "../../common/data-item-state-resolver";
import Config from "../config/config";

import TopicLoader from "./topic-loader";
import ArticleLoader from "./article-loader";
import ArticleContent from "./article-content";

import AuthorLoader from "./author-loader";
import NewspaperLoader from "./newspaper-loader";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Newspaper",
  //@@viewOff:static
};

export const Newspaper = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { params } = props;
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <TopicLoader>
        <TopicContext.Consumer>
          {(dataTopicResult) => {
            return (
              <DataItemStateResolver dataItem={dataTopicResult}>
                <ArticleLoader topicData={dataTopicResult}>
                  <ArticleContext.Consumer>
                    {(dataArticleResult) => {
                      return (
                        <DataItemStateResolver dataItem={dataArticleResult}>
                          <AuthorLoader articleData={dataArticleResult}>
                            <AuthorContext.Consumer>
                              {(dataAuthorResult) => {
                                return (
                                  <DataItemStateResolver dataItem={dataAuthorResult}>
                                    <NewspaperLoader id={params.id} authorData={dataAuthorResult}>
                                      <NewspaperContext.Consumer>
                                        {(dataNewspaperResult) => {
                                          return (
                                            <DataItemStateResolver dataItem={dataNewspaperResult}>
                                              <ArticleContent id={params.id} />
                                            </DataItemStateResolver>
                                          );
                                        }}
                                      </NewspaperContext.Consumer>
                                    </NewspaperLoader>
                                  </DataItemStateResolver>
                                );
                              }}
                            </AuthorContext.Consumer>
                          </AuthorLoader>
                        </DataItemStateResolver>
                      );
                    }}
                  </ArticleContext.Consumer>
                </ArticleLoader>
              </DataItemStateResolver>
            );
          }}
        </TopicContext.Consumer>
      </TopicLoader>
    );
    //@@viewOff:render
  },
});

export default Newspaper;
