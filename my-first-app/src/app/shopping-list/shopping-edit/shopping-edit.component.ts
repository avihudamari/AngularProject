import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.modal';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private sls: ShoppingListService) { }
  
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  
  subscription: Subscription;
  editMode:boolean = false;
  editItemIndex: number;
  editItem: Ingredient;

  ngOnInit(): void {
    this.subscription = this.sls.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editItem = this.sls.getIngredient(index);
        this.editForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    );
  }

  addEditIngredient() {
    this.editMode ?
      this.sls.onIngredientEdited(new Ingredient(this.editForm.value.name, this.editForm.value.amount), this.editItemIndex) :
      this.sls.onIngredientAdded(new Ingredient(this.editForm.value.name, this.editForm.value.amount));
    this.clearIngredients();
  }

  deleteIngredient() {
    if(this.editMode) {
      this.sls.onIngredientdeleted(this.editItemIndex);
      this.clearIngredients();
    }
  }

  clearIngredients() {
    this.editForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
