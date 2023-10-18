import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service' 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent {
  title = 'padel-app';
  loadedFeature = 'tournament';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onNavigate(feature: string) {
    console.log('onNavigate called with feature:', feature);
    if (feature === 'tournament') {
      console.log('Attempting to navigate to tournament');
      if (this.authService.isAuthenticated()) {
        console.log('User is authenticated, navigating to tournament');
        this.router.navigate(['/tournament']);
      } else {
        console.log('User is not authenticated');
        this.router.navigate(['/login']);
        this.errorMessage = 'You need to be authenticated to access the tournament.';
      }
    }
  }
}
