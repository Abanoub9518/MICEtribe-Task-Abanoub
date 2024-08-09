// form.reducer.ts
import { createReducer, on } from "@ngrx/store";
import { updateForm, undo, redo } from "./form.actions";
import { FormState } from "../form-model/form";

const initialState: FormState = {
  currentState: { textInput: "", checkbox: false, dropdown: "" },
  undoStack: [],
  redoStack: [],
};

export const formReducer = createReducer(
  initialState,
  on(updateForm, (state, { formData }) => ({
    ...state,
    undoStack: [...state.undoStack, state.currentState],
    currentState: formData,
    redoStack: [],
  })),
  on(undo, (state) => {
    if (state.undoStack.length === 0) return state;

    const previousState = state.undoStack[state.undoStack.length - 1];
    return {
      ...state,
      currentState: previousState,
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [state.currentState, ...state.redoStack],
    };
  }),
  on(redo, (state) => {
    if (state.redoStack.length === 0) return state;

    const nextState = state.redoStack[0];
    return {
      ...state,
      currentState: nextState,
      redoStack: state.redoStack.slice(1),
      undoStack: [...state.undoStack, state.currentState],
    };
  })
);
