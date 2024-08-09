import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { routes } from "./app.routes";
import { formReducer } from "./features/form-feature/form-store/form.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ formState: formReducer }),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
