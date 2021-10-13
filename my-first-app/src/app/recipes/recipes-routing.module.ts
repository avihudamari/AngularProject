import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth.guard";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeEmptyComponent } from "./recipe-empty/recipe-empty.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const recipesRoutes: Routes = [
    {path: '', component: RecipesComponent, canActivate:[AuthGuardService], children: [
        {path: '', component: RecipeEmptyComponent, pathMatch: 'full'},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
        {path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolverService]}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}