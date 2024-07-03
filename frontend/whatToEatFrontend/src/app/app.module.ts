import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RecipeDetailsComponent } from './recipe.details/recipe.details.component';
import { ClarityModule } from '@clr/angular';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatListModule } from '@angular/material/list';
import { ReviewComponent } from './review/review.component'
import { AuthInterceptor } from './authentication/auth.interceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { MealPlansComponent } from './meal-plans/meal-plans.component';
import { ShoppingListsComponent } from './shopping-lists/shopping-lists.component';
import { MealPlanDetailsComponent } from './meal-plan-details/meal-plan-details.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { CreateMealPlanComponent } from './create-meal-plan/create-meal-plan.component';
import { CreateShoppingListComponent } from './create-shopping-list/create-shopping-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipeDetailsComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ReviewComponent,
    UserProfileComponent,
    CreateRecipeComponent,
    MealPlansComponent,
    ShoppingListsComponent,
    MealPlanDetailsComponent,
    ShoppingListDetailsComponent,
    CreateMealPlanComponent,
    CreateShoppingListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    FlexLayoutModule,
    ClarityModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    RouterModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
