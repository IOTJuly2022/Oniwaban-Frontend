import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CognitoService } from '../cognito.service';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let mockCognito = jasmine.createSpyObj('cognitoService',['signIn']);
  let mockHttp = jasmine.createSpyObj('http',['post']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SignInComponent ],
      providers: [{provide: CognitoService, useValue: mockCognito},
        {provide: HttpClient, useValue: mockHttp }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should sign in', () => {
    mockCognito.signIn.and.returnValue(Promise.resolve());
    component.signIn();
    expect(component.loading).toEqual(true);
    expect(mockCognito.signIn).toHaveBeenCalled();
  });
});
