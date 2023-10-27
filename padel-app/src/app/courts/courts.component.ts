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
    this.getCourts();  }

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
    // Get the club_id from AuthService
    const clubIdString = this.authService.getClubID();
    console.log('Club ID retrieved from AuthService:', clubIdString);

  
    if (!clubIdString) {
      console.error('Club ID is not available. Cannot fetch courts.');
      return;
    }
  
    // Convert the clubIdString to a number
    const clubId = Number(clubIdString);
  
    if (isNaN(clubId)) {
      console.error('Invalid club ID. Cannot fetch courts.');
      return;
    }
  
    this.apiService.getCourts(clubId).subscribe(
      (response) => {
        this.courts$.next(response);
      },
      (error) => {
        console.error('Error fetching court data:', error);
        this.errorMessage = 'Error fetching court data. Please try again.';
      }
    );
  }

  getCourtsForPage(): Observable<any[]> {
    return this.courts$.pipe(
      map((courts) => {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return courts.slice(startIndex, startIndex + this.itemsPerPage);
      })
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get lastShownIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalItems(): number {
    return this.courts$.value.length;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }
}
