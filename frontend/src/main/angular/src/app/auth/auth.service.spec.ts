import { LoginRequest, LoginResponse } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    const loginRequest: LoginRequest = {
      username: 'testuser',
      password: 'testpass'
    };

    const loginResponse: LoginResponse = {
      token: 'test-token',
      type: 'Bearer',
      username: 'testuser'
    };

    it('should send login request and store token', () => {
      service.login(loginRequest).subscribe(response => {
        expect(response).toEqual(loginResponse);
        expect(localStorage.getItem('auth_token')).toBe(loginResponse.token);
        expect(localStorage.getItem('username')).toBe(loginResponse.username);
      });

      const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginRequest);

      req.flush(loginResponse);
    });

    it('should handle login error', () => {
      service.login(loginRequest).subscribe({
        error: error => {
          expect(error.status).toBe(401);
          expect(localStorage.getItem('auth_token')).toBeNull();
          expect(localStorage.getItem('username')).toBeNull();
        }
      });

      const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
      req.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('username', 'testuser');
    });

    it('should remove auth items from localStorage', () => {
      service.logout();
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('username')).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when auth token exists', () => {
      localStorage.setItem('auth_token', 'test-token');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false when no auth token exists', () => {
      localStorage.clear();
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('getAuthToken', () => {
    it('should return auth token when it exists', () => {
      const token = 'test-token';
      localStorage.setItem('auth_token', token);
      expect(service.getAuthToken()).toBe(token);
    });

    it('should return null when no auth token exists', () => {
      localStorage.clear();
      expect(service.getAuthToken()).toBeNull();
    });
  });
});