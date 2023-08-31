import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {

  recipes: any[] = [];
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe( response => {
      console.log(response);
      this.recipes = response;
      console.log(this.recipes);
      // this.recipes = response
      } 
     );

  }

  handleSuccessfulResponse(response)
  {
    this.recipes = response.json();
    console.log(this.recipes);
  }

}
