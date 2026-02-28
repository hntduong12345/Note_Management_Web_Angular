import { TestBed } from '@angular/core/testing';

import { NoteLinkService } from './note-link.service';

describe('NoteLinkService', () => {
  let service: NoteLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
