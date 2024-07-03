import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  role: string;
  userId: string;
  userEmail: string
    constructor(private tokenStorage: TokenService,
      private router: Router) {
      
    }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.userId = this.tokenStorage.getUser()._id;
      this.userEmail = this.tokenStorage.getUser().email;
      console.log(this.userId);
    }

  }

  logout(): void {
    this.router.navigate(['home']);
    this.tokenStorage.logout();
  }
}
