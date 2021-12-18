//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./newspaper-context";
//@@viewOff:imports

export function useNewspaper() {
  return useContext(Context);
}

export default useNewspaper;
