// tournament-list.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tournament } from '../tournament.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {
  @Output() tournamentWasSelected = new EventEmitter<Tournament>();
  tournaments: any[] = [
    new Tournament('A Test Tournament', 'This is simply a test', 'https://www.cupraoficial.mx/content/dam/countries/mx/cupra-website/our-dna/cupra-padel-tour-imagen/single-video/Infograf%C3%ADa_CUPRA-PADEL-TOUR-IMAGEN_2.jpg'),
    new Tournament('Another Test Tournament', 'This is simply a test', 'https://i0.wp.com/mula.es/web/wp-content/uploads/2021/05/torneopadel2021.jpg?fit=918%2C1287&ssl=1')
  ]; // Replace 'any[]' with the actual type of your tournaments

  navigateToNewTournament() {
  this.router.navigate(['/new-tournament']);
}

  constructor(private router: Router) {}

  ngOnInit() {

  }

  onTournamentSelected(tournament: Tournament) {
    this.tournamentWasSelected.emit(tournament);
    console.log('torneo seleccionado')
    this.router.navigate(['/tournament']);

  }
}
