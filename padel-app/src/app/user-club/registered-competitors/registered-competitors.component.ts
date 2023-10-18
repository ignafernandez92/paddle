import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Competitor } from 'app/shared/competitors.model';



@Component({
  selector: 'app-registered-competitors',
  templateUrl: './registered-competitors.component.html',
  styleUrls: ['./registered-competitors.component.css'],
})

export class RegisteredCompetitorsComponent implements OnInit {
  tableColumns: string[] = ['Name', 'Last Name', 'DNI'];
  competitors: Competitor[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  newPlayer: any = {
    name: '',
    lastname: '',
    dni: '',
  };

  errorMessage: string = '';
  constructor(private apiService: ApiService) {}

  getCompetitorProperty(competitor: Competitor, column: string): string | number {
    switch (column) {
      case 'Name':
        return competitor.name;
      case 'Last Name':
        return competitor.lastname;
      case 'DNI':
        return competitor.dni;
      default:
        return '';
    }
  }


  ngOnInit() {
    this.getPlayers();
  }

  get lastShownIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalItems(): number {
    return this.competitors.length;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPlayers() {
    this.apiService.getPlayers().subscribe({
      next: (response) => {
        console.log('Players retrieved:', response);
        this.competitors = response.players.map((player: any) => {
          return new Competitor(player.f_name, player.l_name, player.dni);
        });
      },
      error: (error) => {
        console.error('Error getting players:', error);
      }
    });
  }

  createPlayer() {
  
    const existingPlayer = this.competitors.find(player => player.dni === this.newPlayer.dni);

    if (existingPlayer) {
      const errorMessage = `Player ${existingPlayer.name} ${existingPlayer.lastname} with DNI ${existingPlayer.dni} is already created.`;
      console.error(errorMessage);
      this.errorMessage = errorMessage;
    } else {
      const playerData: any = {
        f_name: this.newPlayer.name,
        l_name: this.newPlayer.lastname,
        dni: this.newPlayer.dni,
        email: 'notset@padel.com',
        password: '123456',
        date_of_birth: '2000-01-01',
        role:'player',
      };

      this.apiService.createPlayer(playerData).subscribe({
        next: (response) => {
          console.log('Player created:', response);
          this.competitors.push(response.player);
          this.newPlayer = { name: '', lastname: '', dni: '' };
          this.errorMessage = '';
          this.getPlayers();
        },
        error: (error) => {
          console.error('Error creating player:', error);
          this.errorMessage = '';
        }
      });
    }
  }
}
