import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.modal';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('first recipe',
    'desc of first recipe',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
    [
      new Ingredient('patato', 5),
      new Ingredient('chocolate', 10),
      new Ingredient('tomato', 3)
    ]),
    new Recipe('second recipe',
    'desc of second recipe',
    'https://www.vegrecipesofindia.com/wp-content/uploads/2013/11/instant-pot-chana-masala-recipe-3-280x280.jpg',
    [
      new Ingredient('onion', 2),
      new Ingredient('lemon', 1)
    ])
  ];

  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(selectedRecipe) {
    this.select.emit(selectedRecipe);
  }

}
