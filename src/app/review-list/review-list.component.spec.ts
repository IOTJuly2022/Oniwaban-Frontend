import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Review } from '../review';

import { ReviewListComponent } from './review-list.component';

describe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewListComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by query', () => {
    let reviews = [];
    reviews.push(new Review(1, 1, 1, 'bad'));
    reviews.push(new Review(2, 5, 5, 'great'));
    component.reviews = reviews;
    let gotten = component.sortById(1);
    expect(gotten[0].description).toEqual('bad');
  });
});
