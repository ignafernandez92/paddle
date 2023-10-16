import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  title = 'padel-app';
  loadedFeature = 'tournament'

  onNavigate(feature: string) {
    this.loadedFeature = feature;
}}