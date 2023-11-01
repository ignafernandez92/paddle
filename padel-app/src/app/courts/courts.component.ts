import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css'],
})
export class CourtsComponent implements OnInit {
  errorMessage: string = '';
  courtNumber: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  courts$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getCourts();
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

  onAddCourt() {
    const clubId = 1;
    const courtData = { court_number: this.courtNumber, club_id: clubId };

    this.apiService.addCourt(courtData).subscribe(
      (response) => {
        console.log('Court added successfully:', response);
        this.courtNumber = 0;
        this.getCourts();
      },
      (error) => {
        console.error('Error adding court:', error);
        this.errorMessage = 'Error adding court. Please try again.';
      }
    );
  }

  getCourts() {
    const clubId = this.authService.getClubID();

    if (!clubId) {
      console.error('Club ID is not available. Cannot fetch courts.');
      return;
    }

    this.apiService.getCourts(clubId).subscribe(
      (response) => {
        this.courts$.next(response.courts); // Update to access the correct property
      },
      (error) => {
        console.error('Error fetching court data:', error);
        this.errorMessage = 'Error fetching court data. Please try again.';
      }
    );
  }

  getCourtsForPage(courts: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return courts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get totalItems(): number {
    return this.courts$.value.length;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }
}
