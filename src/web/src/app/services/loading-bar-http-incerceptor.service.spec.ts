import { TestBed } from '@angular/core/testing';

import { LoadingBarHttpIncerceptorService } from './loading-bar-http-incerceptor.service';

describe('LoadingBarHttpIncerceptorService', () => {
  let service: LoadingBarHttpIncerceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingBarHttpIncerceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
