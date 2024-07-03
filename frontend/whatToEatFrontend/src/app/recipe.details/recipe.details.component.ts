import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService, Review } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { UserRole } from '../authentication/sign-up-info';

@Component({
  selector: 'app-recipe.details',
  templateUrl: './recipe.details.component.html',
  styleUrls: ['./recipe.details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  public recipeUrl: String;
  deleteButton: boolean = false;
  isDeleteModalOpen: boolean = false;
  subRecipe: any;
  subReviews: any;
  private id: string;
  public recipe: Recipe;
  public ownerName: String;
  public reviews: Array<Review>;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private token: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    this.subRecipe = this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      console.log(this.id);
      this.recipeService.getById(this.id).subscribe(
        response => this.loadRecipe(response)
      );
    })
  }

  loadRecipe(response: Recipe): void {
    if (response) {
      this.recipe = response;
      console.log(this.recipe);
      this.recipeService.getReviewsForRecipe(this.recipe._id).subscribe((data) => {
        this.reviews = data;
        console.log(this.reviews);
      })
    }
  }

  showReviewButton(): boolean {
    if (this.token.getToken() && this.token.getUser()._id != this.recipe.creator) {
      return true;
    }
    return false;
  }

  showDeleteButton(): boolean {
    if (this.token.getToken() &&
      (this.token.getUser()._id === this.recipe.creator || this.token.getUser().role == UserRole[1])) {
      return true;
    }
    return false;
  }

  showDeleteReviewButton(reviewOwner: string) {
    if (this.token.getToken() &&
      (this.token.getUser()._id === reviewOwner || this.token.getUser().role == UserRole[1])) {
      return true;
    }
    return false;
  }

  deleteReview(reviewId: string) {
    this.recipeService.deleteReviewForRecipe(this.id, reviewId).subscribe(
      response => window.location.reload()
    );
  }
  deleteRecipe(): void {
    this.recipeService.delete(this.id).subscribe(
      response => this.router.navigate(['/home'])
    );
  }
}
