import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { dataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(
        private dss: dataStorageService,
        private rs: RecipeService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.rs.getRecipes();
        if (recipes.length == 0) {
            return this.dss.fetchRecipes(); 
        }
        else {
            return recipes;
        }
    }
}