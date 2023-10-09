import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ResetPasswordService } from '../reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit { // Implement OnInit
  newPassword: string = '';
  confirmPassword: string = '';
  resetToken: string = ''; // Initialize resetToken

  constructor(
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit() {
    // Retrieve the reset token from the URL
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'];
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      // Handle password mismatch error
      console.error('Passwords do not match');
      return;
    }

    // Call the password reset service with the resetToken
    this.resetPasswordService.resetPassword(this.newPassword, this.resetToken).subscribe({
      next: (response) => {
        // Handle successful password reset
        console.log('Password reset successful', response);
      },
      error: (error) => {
        // Handle password reset error
        console.error('Password reset error', error);
      },
      complete: () => {
        // Handle completion if needed
      }
    });
  }
}
