// form.component.ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  selectCurrentFormState,
  selectRedoStack,
  selectUndoStack,
} from "../../form-store/form.selectors";
import { redo, undo, updateForm } from "../../form-store/form.actions";
import { CommonModule } from "@angular/common";
import { FormDataModel, FormState } from "../../form-model/form";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
})
export class FormComponent implements OnInit {
  form: FormGroup;
  undoStack$: Observable<FormDataModel[]>;
  redoStack$: Observable<FormDataModel[]>;

  constructor(private fb: FormBuilder, private store: Store<FormState>) {
    this.form = this.fb.group({
      textInput: [""],
      checkbox: [false],
      dropdown: [""],
    });

    this.undoStack$ = this.store.pipe(select(selectUndoStack));
    this.redoStack$ = this.store.pipe(select(selectRedoStack));
    // this.undoStack$.subscribe((states) => console.log(states)); // to log history
  }

  ngOnInit(): void {
    this.store.select(selectCurrentFormState).subscribe((formState) => {
      this.form.setValue(formState, { emitEvent: false });
    });

    this.form.valueChanges.subscribe((formData) => {
      console.log(formData);
      this.store.dispatch(updateForm({ formData }));
    });
  }

  undo(): void {
    this.store.dispatch(undo());
  }

  redo(): void {
    this.store.dispatch(redo());
  }
  // append current state to form history
  onUpdateForm(formData: FormDataModel) {
    console.log(formData);
    this.store.dispatch(updateForm({ formData }));
  }
}
