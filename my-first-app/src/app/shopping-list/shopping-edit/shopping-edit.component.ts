import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.modal';
import { ShoppingListService } from '../shoping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private sls: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient(name:string, amount:number) {
    this.sls.onIngredientAdded(new Ingredient(name, amount));
  }

  deleteIngredient() {

  }

  clearIngredients() {

  }

}
