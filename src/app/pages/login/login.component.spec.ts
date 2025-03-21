import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to dashboard', async () => {
    const mockToken = 'mocked-token';
    authServiceSpy.login.and.returnValue(of({ token: mockToken }));

    component.username = 'testuser';
    component.password = 'testpassword';
    
    await component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error with HttpErrorResponse', async () => {
    const mockError = new HttpErrorResponse({
      error: { message: 'Invalid credentials' },
      status: 401
    });

    authServiceSpy.login.and.returnValue(throwError(() => mockError));

    component.username = 'testuser';
    component.password = 'wrongpassword';

    await component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', 'wrongpassword');
    expect(component.error).toBe('Invalid credentials');
  });

  it('should handle unknown errors', async () => {
    spyOn(console, 'error');
  
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Unexpected error')));
  
    await component.login();
  
    expect(component.error).toBe('');
    expect(console.error).toHaveBeenCalledWith('Error desconocido', jasmine.any(Error)); // 
  });
  
});
