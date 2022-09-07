import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { ProductViewComponent } from './product-view.component';

describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};


 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewComponent ],
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
},{ provide: Router, useValue: routerSpy }
],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should add to cart', () => {
    spyOn(component, 'sendAlert');
    component.product = new Product(1, 'name', 'desc', 'url', 11);
    component.addToCart();
    expect(component.sendAlert).toHaveBeenCalled();
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

  it('should add review', () => {
    component.product = new Product(1, 'name', 'desc', 'url', 110);
    component.addReview();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/review', 1]);
  });

});
