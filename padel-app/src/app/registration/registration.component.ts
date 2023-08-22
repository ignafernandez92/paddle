import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dni: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      role: ['player', Validators.required] // Default value
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.apiService.registerUser(userData).subscribe(
        (response) => {
          console.log('User registered:', response);
          // Handle successful registration, show a message, or redirect to login page
        },
        (error) => {
          console.error('Error registering user:', error);
          // Handle error, show an error message, etc.
        }
      );
    }
  }
}