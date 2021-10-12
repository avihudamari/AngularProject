import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { RecipeService } from '../recipes/recipe.service';
import { dataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dss: dataStorageService,
    private as: AuthService,
    private rs: RecipeService) {
  }

  @ViewChild('appSnackbar') appSnackbar;
  user: User;
  userSubscription: Subscription;
  storeRecipesSubscription: Subscription;

  ngOnInit(): void {
    this.as.autoSignIn();
    
    this.userSubscription = this.as.userSubject.subscribe(user => {
      this.user = user;
      if (user && user.signUp) {
        this.appSnackbar.fire('You have successfully sign up!');
      }
    });

    this.storeRecipesSubscription = this.rs.recipesStored.subscribe(status => {
      status === 'error' ? 
      this.appSnackbar.fire('There was an error storing the recipes', 'danger') :
      this.appSnackbar.fire('The recipes stored successfully!');
    }
    );
  }

  onStoredRecipes() {
    this.dss.storeRecipes();
  }

  onFetchedRecipes() {
    this.dss.fetchRecipes().subscribe();
  }

  onLogout() {
    this.as.logout();
  }
  
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.storeRecipesSubscription.unsubscribe();
  }
}
