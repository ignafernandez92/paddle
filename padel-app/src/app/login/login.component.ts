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
  user_id: string; // Add this property to store user_id

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user_id = '';
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    const loginData = {
      email: this.email,
      password: this.password,
      role: this.selectedRole,
    };

    this.apiService.loginUser(loginData).subscribe({
      next: (response) => {
        console.log('User logged in:', response);

        const token = response.token;
        this.authService.setToken(token);

        // After successful login, fetch and store the user_id
        this.authService.getUserID().subscribe((userResponse) => {
          this.user_id = userResponse.user_id; // Assuming this is how you get user_id
        });

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error logging in:', error);
      },
    });
  }
}