import { Component, OnInit } from '@angular/core';
import { RecipeService, Review } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  form: any = {
    rating: 1,
    comment: null,
  };
  subRecipe: any;

  recipeId: string;
  isSuccessful: boolean;
  isFailed: boolean;
  errorMessage: any;

  constructor(private recipeService: RecipeService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.subRecipe = this.activatedRoute.paramMap.subscribe(params => { 
      this.recipeId = params.get('id')!;
  })}

  onSubmit(): void {
    const { rating, comment} = this.form;

    this.recipeService.postReviewForRecipe(this.recipeId, new Review(comment, rating)).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isFailed = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isFailed = true;
        }
      });
    // this.recipe.register(new SignUpInfo(email, password, firstName, lastName, UserRole.user, "test"))
  }
}
