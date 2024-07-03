import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService, User } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MealPlan, MealPlanService } from '../services/meal-plan.service';
import { ShoppingList, ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null,
    avatar: null
  };
  user: User;
  userAvatarUrl: any;
  sub: any;
  mealPlans: Array<MealPlan>
  shoppingLists: Array<ShoppingList>

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private mealPlanService: MealPlanService,
    private shoppingListService: ShoppingListService
  ) {

  }
  ngOnInit(): void {
    if (!this.tokenService.getToken() || !this.tokenService.getUser()) {
      this.router.navigate(['home']);
    }

    this.sub = this.activatedRoute.paramMap.subscribe(params => { 
      if (params.get('id') != this.tokenService.getUser()._id) {
        this.router.navigate(['home']);
      }
    });

    this.authService.getUserInfo(this.tokenService.getUser()._id).subscribe(
      response => {
        this.user = response;
        this.userAvatarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.user.avatar);
        this.mealPlanService.getMealPlansForCurrentUser().subscribe(response => {
          this.mealPlans = response;
        });
        this.shoppingListService.getShoppingListsForCurrentUser().subscribe(response => {
          this.shoppingLists = response;
        });
        console.log(this.user);
      }
    );

  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();


    reader.onload = (event: any) => {
      this.form.avatar = event.target.result;
    };

        reader.onerror = (event: any) => {
          console.log("File could not be read: " + event.target.error.code);
        };
    const binaryString = reader.readAsDataURL(file);
  }

  updateProfile() : void {
      console.log(this.form);
      this.authService.updateUser(this.user._id, this.form.firstName, this.form.lastName, this.form.avatar)
      .subscribe(response => {
        this.user = response;
        this.tokenService.saveUser(this.user);
        console.log(this.user);
      
      })
  }
}
