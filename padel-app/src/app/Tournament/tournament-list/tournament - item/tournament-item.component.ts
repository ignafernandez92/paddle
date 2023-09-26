import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from 'app/Tournament/tournament.model'; // Cambia 'tournament' a 'Tournament'

@Component({
  selector: 'app-tournament-item',
  templateUrl: './tournament-item.component.html',
  styleUrls: ['./tournament-item.component.css']
})
export class TournamentItemComponent implements OnInit {
  @Input() tournament: Tournament | undefined; // Cambia 'tournaments' a 'tournament'

  constructor() { }

  ngOnInit(): void { }
}
