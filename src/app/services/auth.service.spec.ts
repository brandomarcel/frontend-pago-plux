import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:5000/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importamos HttpClientTestingModule
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockResponse = { message: 'User registered successfully' };
    const username = 'testuser';
    const password = 'testpassword';

    service.register(username, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });
    req.flush(mockResponse); // Simula la respuesta del servidor
  });

  it('should login a user and return a token', () => {
    const mockResponse = { token: 'test-token' };
    const username = 'testuser';
    const password = 'testpassword';

    service.login(username, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });
    req.flush(mockResponse);
  });

  it('should save and retrieve token from localStorage', () => {
    const token = 'test-token';

    service.saveToken(token);
    expect(service.getToken()).toBe(token);

    localStorage.removeItem('authToken'); // Limpiamos para futuras pruebas
  });

  it('should remove token on logout', () => {
    service.saveToken('test-token');
    service.logout();
    expect(service.getToken()).toBeNull();
  });
});
