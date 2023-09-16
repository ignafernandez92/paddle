import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentZonesComponent } from './tournament-zones.component';

describe('TournamentZonesComponent', () => {
  let component: TournamentZonesComponent;
  let fixture: ComponentFixture<TournamentZonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentZonesComponent]
    });
    fixture = TestBed.createComponent(TournamentZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
