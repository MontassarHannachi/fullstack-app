import { Component, OnInit, inject, signal } from '@angular/core';
import { Appareil } from '../appareil/appareil';
import { AppareilService, Appareil as AppareilModel } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-dashboard',
  imports: [Appareil],
  templateUrl: './appareil-dashboard.html',
  styleUrl: './appareil-dashboard.css',
})
export class AppareilDashboard implements OnInit {
  private appareilService = inject(AppareilService);

  allowed = signal(false);
  appareilList = signal<AppareilModel[]>([]);
  loading = signal(false);

  constructor() {
    setTimeout(() => this.allowed.set(true), 4000);
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.loading.set(true);
    this.appareilService.list().subscribe({
      next: (list) => {
        this.appareilList.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur chargement appareils', err);
        this.loading.set(false);
      },
    });
  }

  onSwitchOnAll() {
    this.appareilService.switchAll('On').subscribe(() => this.load());
  }

  onSwitchOffAll() {
    if (confirm('Are you sure you want to switch off all your appliances?')) {
      this.appareilService.switchAll('Off').subscribe(() => this.load());
    }
  }
}