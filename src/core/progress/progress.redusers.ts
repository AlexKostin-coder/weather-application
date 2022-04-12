import { SET_PROGRESS } from "./progress.const";
import { omit } from "../tools";

export const progress = (state = { elementsProgress: {} }, action: any) => {
  switch (action.type) {
    case SET_PROGRESS: {
      return {
        ...state,
        elementsProgress: action.payload.identifier
          ? action.payload.progress
            ? {
              ...state.elementsProgress,
              [action.payload.identifier]: action.payload.progress,
            }
            : omit(state.elementsProgress, action.payload.identifier)
          : state.elementsProgress,
      };
    }
    default: return state;
  }
}