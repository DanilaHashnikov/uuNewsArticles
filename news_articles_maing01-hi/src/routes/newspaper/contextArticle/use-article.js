//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./article-context";
//@@viewOff:imports

export function useArticle() {
  return useContext(Context);
}

export default useArticle;
