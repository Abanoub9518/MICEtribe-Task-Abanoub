// form.selectors.ts
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { FormState } from "../form-model/form";

export const selectFormState = createFeatureSelector<FormState>("formState");

export const selectCurrentFormState = createSelector(
  selectFormState,
  (state: FormState) => state.currentState
);

export const selectUndoStack = createSelector(
  selectFormState,
  (state: FormState) => state.undoStack
);

export const selectRedoStack = createSelector(
  selectFormState,
  (state: FormState) => state.redoStack
);
