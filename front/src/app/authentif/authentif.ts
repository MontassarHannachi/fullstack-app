import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-authentif',
  imports: [FormsModule],
  templateUrl: './authentif.html',
  styleUrl: './authentif.css',
})
export class Authentif {
  private router = inject(Router);
  readonly auth = inject(AuthService);

  email = '';
  password = '';
  error = '';

  onSignIn() {
    if (!this.email || !this.password) return;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/appareils']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur de connexion';
      }
    });
  }

  onSignOut() {
    this.auth.logout();
  }
}