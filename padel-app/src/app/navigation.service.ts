import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // Provided at root level
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(feature: string) {
    switch (feature) {
      case 'tournament':
        this.router.navigate(['/tournament']);
        break;
      case 'user-club':
        this.router.navigate(['/user-club']);
        break;
      default:
        this.router.navigate(['/']); 
        break;
    }
  }
}
