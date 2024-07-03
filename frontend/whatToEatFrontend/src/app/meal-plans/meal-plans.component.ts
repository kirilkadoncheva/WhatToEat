import { Component, OnInit } from '@angular/core';
import { MealPlan, MealPlanService } from '../services/meal-plan.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-meal-plans',
  templateUrl: './meal-plans.component.html',
  styleUrls: ['./meal-plans.component.css']
})
export class MealPlansComponent implements OnInit {
  mealPlans : any[] = [];
	constructor(private mealPlanService: MealPlanService,
    private recipeService: RecipeService
  ) { }
  
	ngOnInit() {
		this.mealPlanService.getMealPlansForCurrentUser().subscribe((data) => {  
			console.log(data);  
			this.mealPlans = data;  
		})  

	}

}


