// courts.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css'],
})
export class CourtsComponent implements OnInit {
  courts: any[] = [];
  clubId: number = 1; // Set the club ID based on your user or user session

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.getCourts();
  }

  getCourts() {
    this.ApiService.getCourts(this.clubId).subscribe({
      next: (response) => {
        this.courts = response.courts;
      },
      error: (error) => {
        console.error('Error fetching courts', error);
      },
    });
  }

  addCourt(newCourtData: any) {
    this.ApiService.addCourt(newCourtData).subscribe({
      next: () => {
        // Handle success
        this.getCourts(); // Refresh the list
      },
      error: (error) => {
        console.error('Error adding court', error);
      },
    });
  }
}