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
 

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    
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

   
    };
  
}