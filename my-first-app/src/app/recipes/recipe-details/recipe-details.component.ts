import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shoping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private sls: ShoppingListService,
    private rs: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.rs.getRecipe(this.id);
      }
    );
  }

  toShoppingList() {
    this.sls.onIngredientsAdded(this.recipe.ingredients);

    let x = document.getElementById("snackbar");
    console.log(x);
    x.className = "show";
    setTimeout(() =>{
      x.className = x.className.replace("show", "")
      console.log(x);;
    }, 3000);
  }

  onDeleteRecipe() {
    this.rs.onDeleteRecipe(this.id);
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
