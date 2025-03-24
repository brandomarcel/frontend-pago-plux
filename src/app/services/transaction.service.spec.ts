import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService]
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call consultarTransaccion with correct id and return data', () => {
    const mockId = 'abc123';
    const mockResponse = {
      detail: {
        respuest: {
          id: mockId,
          estado: 'succeeded'
        }
      }
    };

    service.consultarTransaccion(mockId).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:5000/api/consultar-transaccionID?idTransaction=${mockId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
