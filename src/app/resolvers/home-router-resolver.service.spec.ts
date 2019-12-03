import { TestBed } from '@angular/core/testing';

import { HomeRouterResolverService } from './home-router-resolver.service';

describe('HomeRouterResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeRouterResolverService = TestBed.get(HomeRouterResolverService);
    expect(service).toBeTruthy();
  });
});
