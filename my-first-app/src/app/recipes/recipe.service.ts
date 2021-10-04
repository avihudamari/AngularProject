import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.modal";
import { Recipe } from "./recipe.model";

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('First recipe',
        'desc of first recipe',
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
        [
          new Ingredient('Potato', 5),
          new Ingredient('Chocolate', 10),
          new Ingredient('Tomato', 3)
        ]),
        new Recipe('Second recipe',
        'desc of second recipe',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2013/11/instant-pot-chana-masala-recipe-3-280x280.jpg',
        [
          new Ingredient('Onion', 2),
          new Ingredient('Lemon', 1)
        ]),
        new Recipe('Third recipe',
        'desc of third recipe',
        'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg',
        [
          new Ingredient('Salt Spoon', 2),
          new Ingredient('Sweet Potato', 1),
          new Ingredient('Orange', 1),
        ])
    ];

    recipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
      return this.recipes.slice()[id];
    }
}