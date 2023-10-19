import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.css']
})
export class NewTournamentComponent implements OnInit {
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
    console.log('NewTournamentComponent - ngOnInit');
  }

  clearErrorMessage() {
      this.errorMessage = '';
    }
  
  }



  
  
