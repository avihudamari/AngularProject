import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuardService } from "./auth/auth.guard";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeEmptyComponent } from "./recipes/recipe-empty/recipe-empty.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, canActivate:[AuthGuardService], children: [
        {path: '', component: RecipeEmptyComponent, pathMatch: 'full'},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
        {path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolverService]}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent},
    // {path: 'auth', component: AuthComponent, canActivate:[!AuthGuardService]}
    {path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}