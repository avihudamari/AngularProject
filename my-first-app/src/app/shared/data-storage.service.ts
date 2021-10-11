import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service"
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class dataStorageService {
    constructor(private http: HttpClient, private rs: RecipeService) {}

    storeRecipes() {
        const recipes = this.rs.getRecipes();

        this.http.put(
            'https://angularprojectrecipebook-8c7a1-default-rtdb.firebaseio.com/recipes.json',
            recipes
        ).subscribe();
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://angularprojectrecipebook-8c7a1-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }),
            tap(
                response => {
                    this.rs.onSetRecipes(response);
                }
            )
        )
    }
}

 