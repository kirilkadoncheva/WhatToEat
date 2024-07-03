import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export class ShoppingList {
  id: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  mealPlans: Array<String>;
  owner: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private SERVER_URL = "http://localhost:8088/api/shoppingLists";
  
  constructor(private httpClient: HttpClient) { }

  public getShoppingListsForCurrentUser() {  
		return this.httpClient.get<ShoppingList[]>(this.SERVER_URL).pipe(catchError(this.handleError));  
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
