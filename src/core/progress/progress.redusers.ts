import {
  UIActionTypes,
  initialUIState,
} from "./progress.const";
import { omit } from "../tools";
import { UIActions } from './progress.types';

export const progress = (state = initialUIState, action: UIActions) => {
  switch (action.type) {
    case UIActionTypes.SET_PROGRESS: {
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