import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible globalmente
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para registrar un usuario
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Método para iniciar sesión y obtener un token
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

}
