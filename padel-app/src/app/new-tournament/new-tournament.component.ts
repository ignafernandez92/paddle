import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.css']
})
export class NewTournamentComponent implements OnInit {
  errorMessage: string = '';
  numberOfPairs: number = 12; // Valor por defecto
  numberOfCourts: number = 1; // Valor por defecto
  startDate: string = ''; // Valor por defecto
  endDate: string = ''; // Valor por defecto

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private apiService: ApiService // Agrega el servicio ApiService
  ) {}

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
    // Aquí debes enviar estos datos al backend
    const tournamentData = {
      numberOfPairs: this.numberOfPairs,
      numberOfCourts: this.numberOfCourts,
      startDate: this.startDate,
      endDate: this.endDate,
      // Otros datos que puedan ser necesarios
    };

    this.apiService.createTournament(tournamentData).subscribe(
      (response) => {
        console.log('Tournament created successfully:', response);
        // Puedes realizar acciones adicionales después de crear el torneo
      },
      (error) => {
        console.error('Error creating tournament:', error);
        // Manejar errores aquí
      }
    );
  }
}





  
  
