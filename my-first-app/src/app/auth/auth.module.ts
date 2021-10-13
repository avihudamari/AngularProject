import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { AuthComponent } from "./auth.component";
import { AuthNoGuardService } from "./authNo.guard";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {path: 'auth', component: AuthComponent, canActivate:[AuthNoGuardService]}
        ])
    ]
})
export class AuthModule {}