import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeEmptyComponent } from "./recipes/recipe-empty/recipe-empty.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: RecipeEmptyComponent, pathMatch: 'full'},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
        {path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolverService]}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}