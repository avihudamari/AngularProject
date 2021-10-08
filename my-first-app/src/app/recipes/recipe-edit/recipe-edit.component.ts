import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private rs: RecipeService) { }

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let imageUrl = '';
    let description = '';
    let ingredientsFormArray = new FormArray([]);

    if(this.editMode) {
      const editRecipe = this.rs.getRecipe(this.id);

      recipeName = editRecipe.name;
      imageUrl = editRecipe.imagePath;
      description = editRecipe.description;

      if(editRecipe['ingredients']) {
        for(let ing of editRecipe.ingredients) {
          ingredientsFormArray.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required,  Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(recipeName, Validators.required),
      'imageUrl': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredientsFormArray
    });

  }

  onSave() {
    const recipeValue = this.recipeForm.value;
    const savedRecipe = new Recipe(
      recipeValue.recipeName,
      recipeValue.description,
      recipeValue.imageUrl,
      recipeValue.ingredients);

    this.editMode ?
      this.rs.onEditRecipe(savedRecipe, this.id) :
      this.rs.onAddRecipe(savedRecipe);

      this.onCancel();
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,  Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  get ingredientsLength() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls.length;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}