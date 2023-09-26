import { Component, OnInit } from '@angular/core';
import { Zone } from 'app/shared/zone.model';

@Component({
  selector: 'app-tournament-zones',
  templateUrl: './tournament-zones.component.html',
  styleUrls: ['./tournament-zones.component.css']
})
export class TournamentZonesComponent  implements OnInit {
  zone: Zone [] = [
    new Zone('Zona A', 10)

  ]

  constructor() {}

  ngOnInit(): void {
    
  }
}

