import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class Recipe {
  constructor(
    private id : string,
    private title: String,
    private description : String,
    private cookingAlgorithm : String,
    private cookingTime : number,
    private numberOfServings : number,
    private image : string,
    private creator : string,
    private ingredients : Array<string>,
  ){}
  }

  export class Ingredient {
    constructor(
      private id : string,
      private name: String,
      private amount : number,
      private unit : string
    ) {}
  }

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private httpClient:HttpClient
  ) { }

  public getAllRecipes()
  {
    let recipes = this.httpClient.get<Recipe[]>('http://localhost:8088/api/recipes',{});
    console.log(recipes);
    return recipes;
  }

  // public getCharity(id: String)
  // {
  //   return this.httpClient.get<Charity[]>('http://localhost:8080/charities/'+id,{headers});
  // }

  // public deleteCharity(id : String)
  // {
  //   return this.httpClient.delete('http://localhost:8080/charities/'+id);
  // }

  // public addCharity(charity : CharityToSave)
  // {
  //   return this.httpClient.post<Number>('http://localhost:8080/charities/',charity)
  // }

  // public estimateDonation(id : String)
  // {
  //   return this.httpClient.get<Number>('http://localhost:8080/charities/estimate_donation/'+id);
  // }

  // public getCharitiesByOwner(username : String)
  // {
  //   return this.httpClient.get<Charity[]>('http://localhost:8080/charities/owner/'+username);
  // }

  // public getParticipatedCharitiesByUser(username : String)
  // {
  //   return this.httpClient.get<Charity[]>('http://localhost:8080/charities/participated/'+username);
  // }
}
