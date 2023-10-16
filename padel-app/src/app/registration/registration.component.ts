import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationStatus: 'success' | 'error' | null = null;
  registrationMessage: string = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dni: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      role: ['player', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;

      this.apiService.registerUser(userData).subscribe({
        next: (response) => {
          this.registrationStatus = 'success';
          this.registrationMessage = 'User registered successfully!';
          this.registrationForm.reset();
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