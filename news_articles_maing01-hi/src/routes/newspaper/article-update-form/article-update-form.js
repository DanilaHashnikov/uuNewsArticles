//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues, useState, useLoading } from "uu5g04-hooks";
import Config from "../../config/config";

import Lsi from "./article-update-form-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const ArticleUpdateForm = createVisualComponent({
  ...STATICS,
  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { dataNewspaper, newspaperHandlerMap } = props;

    //@@viewOn:hooks
    const { closeModal, showAlert, data, listHandlerMap, isCreateForm, listId } = props;
    const [isLoading, setLoading] = useState(false);
    //@@viewOff:hooks

    //@@viewOn:private
    async function handleUpdate(formData) {
      const { values, component } = formData;
      let response;
      component.setPending();

      try {
        response = props.newspaperHandlerMap.update({ id: dataNewspaper.id, name: values.name });
      } catch (e) {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
          colorSchema: "danger",
        });
      }

      console.log("dataNewspaper", dataNewspaper.id);
      console.log("values.name", values.name);

      component.setReady();

      if (response) {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveSuccess} />} />,
          colorSchema: "success",
        });

        closeModal();
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <UU5.Forms.ContextForm
        onSave={handleUpdate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <UU5.Forms.Text label="Type your new newspaper name" name="name" />
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
const ArticleUpdateHeader = () => {
  return (
    <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} info={<UU5.Bricks.Lsi lsi={Lsi.info} />} />
  );
};

const ArticleUpdateControls = (isCreateForm) => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{
        content: <UU5.Bricks.Lsi lsi={isCreateForm ? Lsi.submit("Create") : Lsi.submit("Update")} />,
      }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
//viewOff:helpers

//viewOn:exports
export { ArticleUpdateForm, ArticleUpdateHeader, ArticleUpdateControls };
export default ArticleUpdateForm;
//viewOff:exports
