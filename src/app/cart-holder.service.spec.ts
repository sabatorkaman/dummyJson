import { TestBed } from '@angular/core/testing';

import { CartHolderService } from './cart-holder.service';

describe('CartHolderService', () => {
  let service: CartHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
