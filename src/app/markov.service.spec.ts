import { TestBed } from '@angular/core/testing';

import { MarkovService } from './markov.service';

describe('MarkovService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkovService = TestBed.get(MarkovService);
    expect(service).toBeTruthy();
  });
});
