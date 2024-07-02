import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SignUpInfo, UserRole } from '../authentication/sign-up-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  imageFile: {link: string, file: any, name: string};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password, firstName, lastName } = this.form;

    this.authService.register(new SignUpInfo(email, password, firstName, lastName, UserRole.user, "test")).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
