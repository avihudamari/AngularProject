import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.modal';
import { ShoppingListService } from './shoping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  shoppingListChangeSub: Subscription;
  constructor(private sls: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.sls.getIngredients();
    this.shoppingListChangeSub = this.sls.shoppingListChange.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ingClicked(i) {
    this.sls.startEditing.next(i);
  }

  ngOnDestroy() {
    this.shoppingListChangeSub.unsubscribe();
  }
}
