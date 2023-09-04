import { Component, OnInit } from '@angular/core';
import { SingInTournamentsService } from 'app/core/services/singInTournaments/sing-in-tournaments.service';

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.sass']
})

export class TournamentsPageComponent implements OnInit {
tournaments: Array<{name: string, price: number}> = [];

  constructor(private singInTournamentsService: SingInTournamentsService) {

  }
  ngOnInit(): void {
  this.singInTournamentsService.tremendaFunction
  this.tournaments = this.singInTournamentsService.tournaments;
  }
}
