import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

export class Response {
  response: any = {
    data: null
  };
}
export class MealPlan {
  id: string;
  date: Date;
  recipes: Array<String>;
  owner: string

  constructor(id: string,
    date: Date,
    recipes: Array<String>,
    owner: string
  ) {
    this.id = id;
    this.date = date;
    this.recipes = recipes;
    this.owner = owner;
  }
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private SERVER_URL = "http://localhost:8088/api/mealPlans";
  
  constructor(private httpClient: HttpClient) { }

  public getMealPlansForCurrentUser() {  
		return this.httpClient.get<MealPlan[]>(this.SERVER_URL).pipe(catchError(this.handleError));  
	}  

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
}
