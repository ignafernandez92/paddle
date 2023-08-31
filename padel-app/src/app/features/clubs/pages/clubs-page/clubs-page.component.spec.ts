import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsPageComponent } from './clubs-page.component';

describe('ClubsPageComponent', () => {
  let component: ClubsPageComponent;
  let fixture: ComponentFixture<ClubsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubsPageComponent]
    });
    fixture = TestBed.createComponent(ClubsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
