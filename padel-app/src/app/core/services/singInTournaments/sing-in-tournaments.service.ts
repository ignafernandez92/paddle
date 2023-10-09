import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingInTournamentsService {

  tournaments:Array<{name: string, price: number}> = [{
    name: "Nivel Padel",
    price: 6000,
  }];

  constructor() { }

  tremendaFunction() {
    console.log("soy tremenda")
  }

  addTournaments(tournaments: {name: string, price: number}) {
    this.tournaments.push(tournaments)
  }
}
