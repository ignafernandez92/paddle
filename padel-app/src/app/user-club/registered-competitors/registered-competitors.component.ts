import { Component, OnInit } from '@angular/core';
import { Competitor } from 'app/shared/competitors.model';

@Component({
  selector: 'app-registered-competitors',
  templateUrl: './registered-competitors.component.html',
  styleUrls: ['./registered-competitors.component.css']
})

export class RegisteredCompetitorsComponent implements OnInit {
  competitors: Competitor[] = [
    new Competitor('agustin', 37617060),
    new Competitor('ignacio', 36983508)
  ];

  constructor() {}

  ngOnInit() {

  }

}


