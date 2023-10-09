// tournament-list.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent {
  tournaments: any[] = []; // Replace 'any[]' with the actual type of your tournaments

  // other component logic here
}
