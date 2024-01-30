// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password)
        .subscribe(
          response => {
            // Successful login
            console.log('Login successful', response);
            // Redirect to desired route or perform additional actions
            this.router.navigate(['/dashboard']);
          },
          error => {
            // Handle login error
            console.error('Login error', error);

            if (error.status === 401) {
              // Unauthorized - Invalid credentials
              this.errorMessage = 'Invalid username or password';
            } else {
              // Other errors
              this.errorMessage = 'An error occurred. Please try again.';
            }
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  logout(): void {
    this.authService.logout()
      .subscribe(
        response => {
          // Successful logout
          console.log('Logout successful', response);
          // Redirect to login or another page
          this.router.navigate(['/login']);
        },
        error => {
          // Handle logout error
          console.error('Logout error', error);

          if (error.status === 401) {
            // Unauthorized - User is not authenticated
            this.errorMessage = 'You are not authenticated';
          } else {
            // Other errors
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      );
  }
}
