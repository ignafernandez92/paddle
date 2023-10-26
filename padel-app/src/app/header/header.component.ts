import { Component, EventEmitter, Output } from "@angular/core";
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:  ['./header.component.css']
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();
  isDropdownOpen = false;

  constructor(private authService: AuthService, private router: Router) { } // Inject AuthService and Router

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.removeToken(); 
    this.authService.removeUserID();
    this.router.navigate(['/login']); 
  }
}
