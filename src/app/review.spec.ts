import { Review } from './review';

describe('Review', () => {
  it('should create an instance', () => {
    expect(new Review(1, 3, 100, "good")).toBeTruthy();
  });
});
