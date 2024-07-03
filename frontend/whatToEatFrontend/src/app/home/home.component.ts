import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes : any[] = [];
	constructor(private recipeService: RecipeService) { }
  
	ngOnInit() {
		this.recipeService.get().subscribe((data) => {  
			console.log(data);  
			this.recipes = data;  
		})  
	}
}
