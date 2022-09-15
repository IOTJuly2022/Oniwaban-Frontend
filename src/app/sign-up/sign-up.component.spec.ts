import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CognitoService } from '../cognito.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockCognito = jasmine.createSpyObj('cognitoService',['signUp', 'confirmSignUp']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SignUpComponent ],
      providers: [{provide: CognitoService, useValue: mockCognito}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
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
  
  it('should sign up', ()=> {
    mockCognito.signUp.and.returnValue(Promise.resolve());
    component.signUp();
    expect(component.loading).toEqual(true);
    expect(mockCognito.signUp).toHaveBeenCalled();
  });

  it('should confirm sign up', ()=> {
    mockCognito.confirmSignUp.and.returnValue(Promise.resolve());
    component.confirmSignUp();
    expect(component.loading).toEqual(true);
    expect(mockCognito.confirmSignUp).toHaveBeenCalled();
  });
});
