import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../product';

import { ReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let mockHttp = jasmine.createSpyObj('http',['post']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewComponent ],
      providers: [
        {
    provide: ActivatedRoute,
    useValue: {
        snapshot: {
            paramMap: {
                get(): string {
                    return '123';
                },
            },
        },
    },
},
{provide: HttpClient, useValue: mockHttp }
],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate random number', () => {
    let num = component.randomInteger(1, 10);
    expect(num).toBeGreaterThanOrEqual(1);
    expect(num).toBeLessThanOrEqual(10);
  });

  it('should send alert', () => {
    spyOn(component, "retractAlert");
    let dummyElement = document.createElement('notification');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.sendAlert('msg');
    expect(document.getElementById('notification')?.innerHTML).toEqual('<h3>msg</h3>');
  });

  it('should retract alert', () => {
    let dummyElement = document.createElement('notification');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.retractAlert();
    expect(document.getElementById('notification')?.style.height).toEqual('0px');
  });

  
  it('should submit review', () => {
    mockHttp.post.and.returnValue(of(true));
    spyOn(component, 'randomInteger');
    component.product = new Product(1, 'bat', 'desc', 'image', 110);
    component.submitReview();
    expect(component.randomInteger).toHaveBeenCalledTimes(1);
    expect(mockHttp.post).toHaveBeenCalled();
  });


});
