import { cartItem } from './cart-item';

describe('CartItem', () => {
  it('should create an instance', () => {
    expect(new cartItem(1,'test', 2)).toBeTruthy();
  });
});
