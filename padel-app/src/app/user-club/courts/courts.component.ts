import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css']
})
export class CourtsComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('dniInput', {static: false}) dniInputRef: ElementRef;
  courtAdded = new EventEmitter<{name: string, dni: number}>();
  constructor() {}

  ngOnInit(): void {
    
  }

  onAddItem() {


  }

}
