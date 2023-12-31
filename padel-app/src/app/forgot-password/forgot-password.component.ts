import { Component } from '@angular/core';
import { ResetPasswordService } from '../reset-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private resetPasswordService: ResetPasswordService) {    console.log('ForgotPasswordComponent constructed');
}

  sendResetEmail() {
    if (!this.email) {
      return;
    }

    this.resetPasswordService.sendResetEmail(this.email).subscribe(
      (response) => {
        console.log('Password reset email sent', response);
      },
      (error) => {
        console.error('Error sending email', error);
      }
    );
  }
}
