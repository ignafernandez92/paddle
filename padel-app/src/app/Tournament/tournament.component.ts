import { Component, OnInit } from '@angular/core';
import { Tournament } from './tournament.model';
import { AuthService } from '../auth.service';
import { NavigationService } from '../navigation.service';
@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css'],
})
export class TournamentComponent implements OnInit {
  selectedTournament: Tournament | undefined;
  errorMessage: string = '';

  constructor(private authService: AuthService, private navigationService: NavigationService) {}

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
    console.log('TournamentComponent - ngOnInit');
  }

  ngOnChanges() {
    console.log('Selected Tournament:', this.selectedTournament);
  }

}

  
