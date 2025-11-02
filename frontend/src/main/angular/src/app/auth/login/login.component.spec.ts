import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
// ...existing code...

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const authSpy = {
      login: jest.fn()
    } as unknown as jest.Mocked<AuthService>;
    
    const routerSpy = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should show validation errors when fields are touched and empty', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    usernameControl?.markAsTouched();
    passwordControl?.markAsTouched();
    fixture.detectChanges();

    const errorElements = fixture.debugElement.queryAll(By.css('.invalid-feedback'));
    expect(errorElements.length).toBe(2);
  });

  it('should enable submit button when form is valid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'testpass'
    });
    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should call auth service and navigate on successful login', () => {
    const loginResponse = {
      token: 'test-token',
      type: 'Bearer',
      username: 'testuser'
    };
    authService.login.mockReturnValue(of(loginResponse));

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'testpass'
    });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpass'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/welcome']);
    expect(component.error).toBeNull();
  });

  it('should show error message on login failure', () => {
    const errorMessage = 'Invalid credentials';
    authService.login.mockReturnValue(throwError(() => new Error(errorMessage)));

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'wrongpass'
    });
    component.onSubmit();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.alert-danger'));
    expect(errorElement.nativeElement.textContent.trim()).toBe(errorMessage);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should show loading state during login', () => {
    authService.login.mockReturnValue(of({
      token: 'test-token',
      type: 'Bearer',
      username: 'testuser'
    }));

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'testpass'
    });

    expect(component.isLoading).toBeFalsy();

    component.onSubmit();
    expect(component.isLoading).toBeTruthy();
  });
});