import { SET_PROGRESS } from "./progress.const";

export const setProgress = (progress: boolean, identifier: string = ""): any => {
  return {
    type: SET_PROGRESS,
    payload: {
      progress,
      identifier,
    },
  };
}