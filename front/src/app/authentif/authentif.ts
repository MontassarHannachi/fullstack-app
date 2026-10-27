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
  readonly auth = inject(AuthService);   // public → utilisable dans le template

  email = '';
  password = '';

  onSignIn() {
    if (!this.email || !this.password) return;
    this.auth.signIn();
    this.router.navigate(['/appareils']);
  }

  onSignOut() {
    this.auth.signOut();
    this.router.navigate(['/home']);
  }
}