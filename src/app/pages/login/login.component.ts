import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    console.log('aplaste');
    try {
      const response = await firstValueFrom(this.authService.login(this.username, this.password));
      console.log('response',response);
      this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        this.error = error.error.message;
        console.error('Error:', error.error.message);
      } else {
        console.error('Error desconocido', error);
      }
    }
  }
}
