//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./author-context";
//@@viewOff:imports

export function useAuthor() {
  return useContext(Context);
}

export default useAuthor;
