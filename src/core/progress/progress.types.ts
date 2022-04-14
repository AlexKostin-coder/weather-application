import { UIActionTypes } from "./progress.const";

export interface SetProgressAction { 
  type: UIActionTypes.SET_PROGRESS,
  payload: {
    progress: boolean,
    identifier: string,
  }
}

export type UIActions = SetProgressAction;