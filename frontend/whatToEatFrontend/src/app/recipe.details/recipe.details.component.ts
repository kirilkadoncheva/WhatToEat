import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe.details',
  templateUrl: './recipe.details.component.html',
  styleUrls: ['./recipe.details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  public recipeUrl : String ;
  deleteButton : boolean = false;
  isDeleteModalOpen : boolean = false;
  sub : any ;
  private id: string;
  public recipe: Recipe;

  constructor(private activatedRoute:ActivatedRoute,
    private recipeService: RecipeService,
    private router : Router) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id')!; 
      console.log(this.id);
      this.recipeService.getById(this.id).subscribe(
        response => this.loadRecipe(response)
       );
  })}

  loadRecipe(response: Recipe): void {

    if(response)
    {
      console.log(response);
      this.recipe = response;
      console.log(this.recipe);
      // this.checkCharityOwner();

    }
    // else
    // {

    // }
    
  
  }
  
}
