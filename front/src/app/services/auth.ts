import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
private apiUrl = 'https://fullstack-app-12lt.onrender.com/api/auth';
  isAuth = signal(!!localStorage.getItem('token'));

  login(email: string, password: string) {
    return this.http.post<{ token: string; email: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.isAuth.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuth.set(false);
    this.router.navigate(['/login']);
  }
}