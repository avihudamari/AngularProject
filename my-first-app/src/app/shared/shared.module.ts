import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        SnackbarComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        SnackbarComponent,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {}