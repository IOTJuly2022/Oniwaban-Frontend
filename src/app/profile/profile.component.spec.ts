import { ComponentFixture, InjectSetupWrapper, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { isUsernamePasswordOpts } from '@aws-amplify/auth/lib-esm/types';
import { CognitoService, IUser } from '../cognito.service';

import { ProfileComponent } from './profile.component';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const user: IUser = { email:'email', password:'pass',showPassword:false, code:'code', name:'name'};
  let mockCognito = jasmine.createSpyObj('cognitoService',['updateUser', 'getUser']);
  mockCognito.getUser.and.returnValue(Promise.resolve(user));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ ProfileComponent ],
      providers: [{provide: CognitoService, useValue: mockCognito}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should update', ()=> {
    mockCognito.updateUser.and.returnValue(Promise.resolve());
    component.user = user;
    component.update();
    expect(component.loading).toEqual(true);
    expect(mockCognito.updateUser).toHaveBeenCalled();
  });
  

});
