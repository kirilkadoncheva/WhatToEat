import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient, Recipe, RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit{
   ingredients!: FormArray;
   reactform = new FormGroup({
     title: new FormControl('', Validators.required),
     description: new FormControl('', Validators.required),
     cookingTime: new FormControl(0, Validators.required),
     numberOfServings: new FormControl(0, Validators.required),
     cookingInstructions: new FormControl('', Validators.required),
     ingredients: new FormArray([])
   });

   imageUrl: string;
   recipeId: String;
   success: boolean;

  constructor(private recipeService: RecipeService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.success=false;
    this.addIngredient();
  }

  save() {
    let title = '';
    if (this.reactform.get('title') != null) {
      title = this.reactform.get('title')!.value || '';
    }

    let description = '';
    if (this.reactform.get('description') != null) {
      description = this.reactform.get('description')!.value || '';
    }

    let cookingAlgorithm = '';
    if (this.reactform.get('cookingInstructions') != null) {
      cookingAlgorithm = this.reactform.get('cookingInstructions')!.value || '';
    }

    let cookingTime = 0;
    if (this.reactform.get('cookingTime') != null) {
      cookingTime = this.reactform.get('cookingTime')!.value || 0;
    }

    let numberOfServings = 0;
    if (this.reactform.get('numberOfServings') != null) {
      numberOfServings = this.reactform.get('numberOfServings')!.value || 0;
    }

    let array = new Array();

    this.reactform.get('ingredients')?.value.forEach(ingredient => {
      array.push(ingredient);   
  });

    let recipe = new Recipe('', '', '', 
      title,
      description,
      cookingTime,
      numberOfServings,
      cookingAlgorithm,
      this.imageUrl,
      array
    );

    this.recipeService.create(recipe).subscribe(response => {
      this.success = true;
      this.recipeId = (response as Recipe)['_id'];
    });

  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();


    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };

        reader.onerror = (event: any) => {
          console.log("File could not be read: " + event.target.error.code);
        };
    const binaryString = reader.readAsDataURL(file);
  }

  addIngredient() {
    this.ingredients = this.reactform.get("ingredients") as FormArray;
    this.ingredients.push(this.generateRow())
  }
  
  generateRow(): FormGroup {
    return new FormGroup({
     name:new FormControl('',Validators.required),
     amount:new FormControl('',Validators.required),
     unit:new FormControl('',Validators.required),
    });
  }
  
  removeIngredient(index:any){
    this.ingredients = this.reactform.get("ingredients") as FormArray;
    this.ingredients.removeAt(index);
  }

  get ingredientss(){
    return this.reactform.get("ingredients") as FormArray;
  }

}
