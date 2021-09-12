import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modal';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Tomato', 3),
    new Ingredient('Cucamber', 5)
  ];
  
  log(val) { console.log(val); }

  constructor() { }

  ngOnInit(): void {
  }

}
