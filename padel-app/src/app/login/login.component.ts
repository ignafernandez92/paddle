import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  selectedRole: string = 'player';
  email: string = ''; 
  password: string = '';

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    console.log('onSubmit function called'); 
    const userData = {
      email: this.email,
      password: this.password,
      role: this.selectedRole
    };

    this.apiService.loginUser(userData).subscribe(
      (response) => {
        console.log('User logged in:', response);
      },
      (error) => {
        console.error('Error logging in:', error);
      }
    );
  }
}