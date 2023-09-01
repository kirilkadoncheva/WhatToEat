import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export class Ingredient {
  id : string;
  name: String;
  unit : String;
  amount : number;
  constructor(
    id : string,
    name: String,
    unit : String,
    amount : number,
  ) {}
}

export class Recipe {
  id : string;
  owner: String;
  title : String;
  description : String;
  cookingTime : number;
  numberOfServings : number;
  cookingAlgorithm : string;
  image : string;
  ingredients : Array<Ingredient>;

  constructor(
     owner: String,
  title : String,
  description : String,
  cookingTime : number,
  numberOfServings : number,
  cookingAlgorithm : string,
  image : string,
  ingredients : Array<Ingredient>,
  ) {}
}

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

}
