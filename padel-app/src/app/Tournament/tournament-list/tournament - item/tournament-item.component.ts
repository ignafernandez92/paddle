import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tournament } from 'app/Tournament/tournament.model'; // Cambia 'tournament' a 'Tournament'

@Component({
  selector: 'app-tournament-item',
  templateUrl: './tournament-item.component.html',
  styleUrls: ['./tournament-item.component.css']
})

export class TournamentItemComponent {
  @Input() tournament: Tournament = new Tournament('', '', '');
  @Output() tournamentSelected = new EventEmitter<Tournament>();

  onTournamentClick() {
    this.tournamentSelected.emit(this.tournament);
  }
}





