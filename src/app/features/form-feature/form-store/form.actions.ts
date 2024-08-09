// form.actions.ts
import { createAction, props } from "@ngrx/store";
import { FormDataModel } from "../form-model/form";

export const updateForm = createAction(
  "[Form] Update Form",
  props<{ formData: FormDataModel }>()
);

export const undo = createAction("[Form] Undo");
export const redo = createAction("[Form] Redo");
