import { TestBed } from '@angular/core/testing';

import { SingInTournamentsService } from './sing-in-tournaments.service';

describe('SingInTournamentsService', () => {
  let service: SingInTournamentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingInTournamentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
