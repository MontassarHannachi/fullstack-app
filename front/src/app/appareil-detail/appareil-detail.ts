import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppareilService, Appareil } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-detail',
  imports: [RouterLink],
  templateUrl: './appareil-detail.html',
  styleUrl: './appareil-detail.css',
})
export class AppareilDetail {
  private route = inject(ActivatedRoute);
  private appareilService = inject(AppareilService);

  appareil = signal<Appareil | null>(null);
  loading = signal(false);                // ← AJOUT
  private currentId: string | null = null;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.currentId = params.get('id');
      this.load();
    });
  }

  private load() {
    if (!this.currentId) { this.appareil.set(null); return; }
    this.loading.set(true);
    this.appareilService.getById(this.currentId).subscribe({
      next: (a) => { this.appareil.set(a); this.loading.set(false); },
      error: () => { this.appareil.set(null); this.loading.set(false); },
    });
  }

  onSwitchOn() {
    if (!this.currentId) return;
    this.appareilService.switchOn(this.currentId).subscribe((a) => this.appareil.set(a));
  }

  onSwitchOff() {
    if (!this.currentId) return;
    this.appareilService.switchOff(this.currentId).subscribe((a) => this.appareil.set(a));
  }

  onDelete() {
    if (!this.currentId || !confirm('Supprimer cet appareil ?')) return;
    this.appareilService.remove(this.currentId).subscribe(() => this.appareil.set(null));
  }
}