import { Component, OnInit } from '@angular/core';
import { Tournament } from './tournament.model';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  selectedTournament: Tournament | undefined;

  constructor() {}

  ngOnInit(): void {
  
}
}