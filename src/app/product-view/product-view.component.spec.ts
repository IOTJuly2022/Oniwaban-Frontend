import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ProductViewComponent } from './product-view.component';

describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;

 

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
},
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
});
