import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RecipeDetailsComponent } from './recipe.details/recipe.details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ShoppingListsComponent } from './shopping-lists/shopping-lists.component';
import { MealPlansComponent } from './meal-plans/meal-plans.component';
import { authGuard } from './guards/auth.guard';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'recipes/:id',
    component: RecipeDetailsComponent
  },
  {
    path: 'recipes/:id/review',
    component: ReviewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profiles/:id',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'createRecipe',
    component: CreateRecipeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'myShoppingLists',
    component: ShoppingListsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'myShoppingLists/:id',
    component: ShoppingListDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'myMealPlans',
    component: MealPlansComponent,
    canActivate: [authGuard],
  },
  {
    path: 'myMealPlans/:id',
    component: MealPlansComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }