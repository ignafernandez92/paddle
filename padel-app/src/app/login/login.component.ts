import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  selectedRole: string = 'player';
  email: string = ''; 
  password: string = '';

  constructor(private apiService: ApiService, private authService: AuthService) {}

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

        // Assuming your response includes the token, verify it
        const token = response.token;
        const decodedToken = this.authService.verifyToken(token);

        if (decodedToken) {
          // Token is valid, you can proceed with actions based on role
          console.log('Decoded Token:', decodedToken);
          // Redirect to appropriate dashboard or perform other actions
        } else {
          console.log('Invalid token');
        }
      },
      (error) =>{
        console.error('Error logging in:', error);
        // Handle error, show an error message, etc.
      }
    );
  }
}
 