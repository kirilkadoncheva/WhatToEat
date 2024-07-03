import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent implements OnInit {
  shoppingLists : any[] = [];
	constructor(private shoppingListService: ShoppingListService
  ) { }
  
	ngOnInit() {
		this.shoppingListService.getShoppingListsForCurrentUser().subscribe((data) => {  
			console.log(data);  
			this.shoppingLists = data;  
		})  

	}

}



