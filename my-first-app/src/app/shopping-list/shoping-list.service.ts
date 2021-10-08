import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.modal";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Tomato', 3),
        new Ingredient('Cucamber', 5)
    ];

    shoppingListChange = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients.slice()[index];
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.shoppingListChange.next(this.getIngredients());
    }

    onIngredientEdited(ingredient: Ingredient, index: number) {
        this.ingredients[index] = ingredient;
        this.shoppingListChange.next(this.getIngredients());
    }

    onIngredientdeleted(index: number) {
        this.ingredients.splice(index, 1);
        this.shoppingListChange.next(this.getIngredients());
    }


    onIngredientsAdded(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.shoppingListChange.next(this.getIngredients());
    }
}