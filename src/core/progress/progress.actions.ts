import { UIActionTypes } from "./progress.const";
import { SetProgressAction } from "./progress.types";

export const setProgress = (progress: boolean, identifier: string = ""): SetProgressAction => {
  return {
    type: UIActionTypes.SET_PROGRESS,
    payload: {
      progress,
      identifier,
    },
  };
}