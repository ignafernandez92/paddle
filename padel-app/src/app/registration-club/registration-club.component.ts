import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration-club.component.html',
  styleUrls: ['./registration-club.component.css'],
})
export class RegistrationClubComponent implements OnInit {
  registrationClubForm: FormGroup;
  registrationStatus: 'success' | 'error' | null = null;
  registrationMessage: string = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.registrationClubForm = this.fb.group({
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dni: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      club_id: 1,
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationClubForm.valid) {
      const userData = {
        ...this.registrationClubForm.value,
        role: 'club_admin',
      };

      this.apiService.registerUser(userData).subscribe({
        next: (response) => {
          this.registrationStatus = 'success';
          this.registrationMessage = 'User registered successfully!';
          this.registrationClubForm.reset();
        },
        error: (error) => {
          this.registrationStatus = 'error';
          this.registrationMessage = 'Error registering user. Please try again.';
          console.error('Error registering user:', error);
        },
      });
    }
  }
}