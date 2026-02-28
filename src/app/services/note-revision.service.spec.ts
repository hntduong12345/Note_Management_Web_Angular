import { TestBed } from '@angular/core/testing';

import { NoteRevisionService } from './note-revision.service';

describe('NoteRevisionService', () => {
  let service: NoteRevisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteRevisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
