import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.modal";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Tomato', 3),
        new Ingredient('Cucamber', 5)
    ];

    shoppingListChange = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.shoppingListChange.next(this.getIngredients());
    }

    onIngredientsAdded(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.shoppingListChange.next(this.getIngredients());
    }
}