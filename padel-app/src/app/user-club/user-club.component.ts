import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-club',
  templateUrl: './user-club.component.html',
  styleUrls: ['./user-club.component.css'],
})
export class UserClubComponent {
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
}