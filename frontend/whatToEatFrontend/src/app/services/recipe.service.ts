import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export class Ingredient {
  id : string;
  name: string;
  unit : string;
  amount : number;
  constructor(
    id : string,
    name: string,
    unit : string,
    amount : number,
  ) {}
}

export class Recipe {
  _id : String;
  creator: String;
  creatorName: String;
  title : String;
  description : String;
  cookingTime : number;
  numberOfServings : number;
  cookingAlgorithm : String;
  image : String;
  ingredients : Array<Ingredient>;

  constructor(
  id : String,
  creator: String,
  creatorName: String,
  title : String,
  description : String,
  cookingTime : number,
  numberOfServings : number,
  cookingAlgorithm : String,
  image : String,
  ingredients : Array<Ingredient>,
  ) {
    this._id = id;
    this.creator = creator;
    this.creatorName = creatorName;
    this.title = title;
    this.description = description,
    this.cookingTime = cookingTime;
    this.numberOfServings = numberOfServings;
    this.cookingAlgorithm = cookingAlgorithm;
    this.image = image;
    this.ingredients = ingredients;
  }
}

export class Review {
  _id : string;
  reviewer: string;
  reviewerName: string;
  comment: string;
  rating : number;

  constructor(
  comment : string,
  rating : number,
  ) {
    this.comment = comment;
    this.rating = rating;
  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  private SERVER_URL = "http://localhost:8088/api/recipes";
  
constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
	public get(){  
		return this.httpClient.get<Recipe[]>(this.SERVER_URL).pipe(catchError(this.handleError));  
	}  

  public getById(id: string){  
		return this.httpClient.get<Recipe>(this.SERVER_URL + "/" + id).pipe(catchError(this.handleError));  
	}  

  public delete(id: string){  
		return this.httpClient.delete(this.SERVER_URL + "/" + id).pipe(catchError(this.handleError));  
	}  

  public create(recipe: Recipe) {
    return this.httpClient.post(this.SERVER_URL, recipe);
  }

  public getReviewsForRecipe(id: String){  
		return this.httpClient.get<Review[]>(this.SERVER_URL + "/" + id + "/reviews").pipe(catchError(this.handleError));  
	}
  
  public postReviewForRecipe(id: String, review: Review): Observable<any> {  
		return this.httpClient.post(this.SERVER_URL + "/" + id + "/reviews", review);  
	}  

  public deleteReviewForRecipe(id: String, reviewId: String): Observable<any> {  
		return this.httpClient.delete(this.SERVER_URL + "/" + id + "/reviews/" + reviewId);  
	}  
}
