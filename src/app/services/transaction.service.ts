import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  consultarTransaccion(idTransaction: string): Observable<any> {
    const params = new HttpParams().set('idTransaction', idTransaction);
    return this.http.get(`${this.apiUrl}/consultar-transaccionID`, { params });
  }
  
}
