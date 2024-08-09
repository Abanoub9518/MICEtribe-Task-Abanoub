export interface FormDataModel {
  textInput: string;
  checkbox: boolean;
  dropdown: string;
}

export interface FormState {
  currentState: FormDataModel;
  undoStack: FormDataModel[];
  redoStack: FormDataModel[];
}
