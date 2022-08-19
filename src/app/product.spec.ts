import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(1,"bat","big bat", "example.url", 100)).toBeTruthy();
  });
});
