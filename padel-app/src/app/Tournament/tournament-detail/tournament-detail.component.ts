import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from '../tournament.model';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  @Input() tournament: Tournament | undefined;

  constructor() {  }
  
  ngOnInit() {

    
  }

}
