//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./topic-context";
//@@viewOff:imports

export function useTopic() {
  return useContext(Context);
}

export default useTopic;
