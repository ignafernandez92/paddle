import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { NavigationService } from '../navigation.service';
import { Tournament } from './tournament-model';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.css']
})
export class NewTournamentComponent implements OnInit {
  errorMessage: string = '';
  tournamentForm: FormGroup;
  user_id: number = 1; 

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.tournamentForm = this.formBuilder.group({
      numberOfPairs: [12, Validators.required],
      numberOfCourts: [1, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onNavigate(feature: string) {
    console.log('onNavigate called with feature:', feature);

    if (this.authService.isAuthenticated()) {
      console.log(`User is authenticated, navigating to ${feature}`);
      this.navigationService.navigateTo(feature);
    } else {
      console.log('User is not authenticated');
      this.navigationService.navigateTo('login');
      this.errorMessage = `You need to be authenticated to access the ${feature}.`;
    }
  }

  ngOnInit(): void {
    console.log('NewTournamentComponent - ngOnInit');
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  onSaveTournament() {
    if (this.tournamentForm.valid) {
      const formValues = this.tournamentForm.value;
      console.log('Form values to be sent to the backend:', formValues);
  
      const newTournamentData = {
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        numberOfPairs: formValues.numberOfPairs,
        numberOfCourts: formValues.numberOfCourts,
        user_id: this.user_id,
      };
  
      this.apiService.createTournament(newTournamentData).subscribe(
        (response) => {
          console.log('Tournament created successfully:', response);
          // Handle success here
        },
        (error) => {
          console.error('Error creating tournament:', error);
          // Handle errors here
        }
      );
    } else {
      console.error('Form is invalid. Please check the form fields.');
    }
  } }