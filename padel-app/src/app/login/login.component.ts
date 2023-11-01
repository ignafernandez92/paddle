import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  selectedRole: string = 'player';
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false; 
  errorMessage: string = ''; 
  user_id: number | null = null;
  club_id: number | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }
  
    this.isSubmitting = true;
    this.errorMessage = '';
  
    const loginData = {
      email: this.email,
      password: this.password,
    };
  
    this.apiService.loginUser(loginData).subscribe(
      (response) => {
        console.log('Response from the backend:', response);
        console.log('user_id from response:', response.user_id);
        this.authService.setToken(response.token);
        this.authService.setUserID(response.user_id);
        this.authService.setClubID(response.club_id);

        const user_id = this.authService.getUserID();
        const club_id = this.authService.getClubID();
  
        if (response.role === 'player') {
          this.router.navigate(['/']);
        } else if (response.role === 'club_admin') {
          this.router.navigate(['/dashboard']);
        } else {
        }
      },
      (error) => {
        this.isSubmitting = false;
        console.error('Login error:', error);
  
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials. Please check your email and password.';
        } else {
          this.errorMessage = 'An error occurred while logging in. Please try again later.';
        }
      }
    );
  }

}