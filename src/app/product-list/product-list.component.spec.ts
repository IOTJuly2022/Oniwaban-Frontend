import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { Router } from '@angular/router';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
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
{ provide: Router, useValue: routerSpy }
],
      imports: [HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should search', () => {
    let prod = [];
    prod.push(new Product(1, 'name', 'desc', 'url', 110));
    prod.push(new Product(2, 'ball', 'desc', 'url', 110));
    component.products = prod;
    component.search();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/products', '']);
  });

  it('should filter products', () => {
    let prod = [];
    prod.push(new Product(1, 'name', 'desc', 'url', 110));
    prod.push(new Product(2, 'ball', 'desc', 'url', 110));
    component.products = prod;
    component.filterProducts('name');
    expect(component.products[0].id).toEqual(1);
  });
});
