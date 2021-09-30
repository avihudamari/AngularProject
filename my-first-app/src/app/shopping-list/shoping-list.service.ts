
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.modal";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Tomato', 3),
        new Ingredient('Cucamber', 5)
    ];

    shoppingListChange = new EventEmitter<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.shoppingListChange.emit(this.getIngredients());
    }

    onIngredientsAdded(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.shoppingListChange.emit(this.getIngredients());
    }
}