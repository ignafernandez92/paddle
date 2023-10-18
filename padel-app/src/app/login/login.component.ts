import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  selectedRole: string = 'player';
  email: string = '';
  password: string = '';

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
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error logging in:', error);
      },
    });
  }
}
