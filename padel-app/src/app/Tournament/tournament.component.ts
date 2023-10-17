import { Component, OnInit } from '@angular/core';
import { Tournament } from './tournament.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css'],
})
export class TournamentComponent implements OnInit {
  selectedTournament: Tournament | undefined;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log('TournamentComponent - ngOnInit');
  }

  onNavigate(feature: string) {
    console.log('TournamentComponent - onNavigate', feature);
    if (feature === 'tournament') {
      if (this.authService.isAuthenticated()) {
        console.log('User is authenticated, navigating to /tournament');
        this.router.navigate(['/tournament']);
      } else {
        console.log('User is not authenticated, displaying an error message');
        this.errorMessage = 'You need to be authenticated to access the tournament.';
      }
    }
  }
}
