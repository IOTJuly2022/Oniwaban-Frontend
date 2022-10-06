import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CognitoService } from './cognito.service';

describe('AppComponent', () => {

  let mockCognito = {isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(of('true')),
  signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve('true')),}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide:CognitoService, useValue:mockCognito }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should init correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(mockCognito.isAuthenticated).toHaveBeenCalledTimes(1);
  });

  it('should signout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.signOut();
    expect(mockCognito.signOut).toHaveBeenCalledTimes(1);
  });

});
