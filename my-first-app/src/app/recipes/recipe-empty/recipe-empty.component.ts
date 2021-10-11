import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-empty',
  templateUrl: './recipe-empty.component.html',
  styleUrls: ['./recipe-empty.component.css']
})
export class RecipeEmptyComponent implements OnInit, OnDestroy {

  constructor(private rs: RecipeService) { }

  recipeListEmpty = false;
  subcription = new Subscription;

  ngOnInit(): void {
    if (this.rs.getRecipes().length === 0) {
      this.recipeListEmpty = true;
    }

    this.subcription = this.rs.recipesChange.subscribe(
      () => {
        if (this.rs.getRecipes().length === 0) {
          this.recipeListEmpty = true;
        }
        else {
          this.recipeListEmpty = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
