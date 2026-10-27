import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appareil } from '../appareil/appareil';
import { Appareil as AppareilModel } from '../models/appareil.model';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-dashboard',
  imports: [FormsModule, Appareil],
  templateUrl: './appareil-dashboard.html',
  styleUrl: './appareil-dashboard.css',
})
export class AppareilDashboard implements OnInit {
  private service = inject(AppareilService);

  appareils = signal<AppareilModel[]>([]);
  error = signal('');
  allowed = signal(false);
  newName = signal('');
  newStatus = signal('Off');

  constructor() {
    setTimeout(() => this.allowed.set(true), 4000);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAppareils().subscribe({
      next: (list) => {
        this.appareils.set(list);
        this.error.set('');
      },
      error: () => this.error.set('Unable to load the appliances'),
    });
  }

  onSwitch(a: AppareilModel) {
    const status = a.status === 'On' ? 'Off' : 'On';
    this.service.updateAppareil(a._id, { name: a.name, status }).subscribe({
      next: (updated) =>
        this.appareils.update((list) => list.map((x) => (x._id === updated._id ? updated : x))),
      error: () => this.error.set('Unable to update the appliance'),
    });
  }

  onDelete(a: AppareilModel) {
    if (!confirm(`Delete "${a.name}"?`)) return;
    this.service.deleteAppareil(a._id).subscribe({
      next: () => this.appareils.update((list) => list.filter((x) => x._id !== a._id)),
      error: () => this.error.set('Unable to delete the appliance'),
    });
  }

  onAdd() {
    const name = this.newName().trim();
    if (!name) return;
    this.service.addAppareil({ name, status: this.newStatus() as 'On' | 'Off' }).subscribe({
      next: (created) => {
        this.appareils.update((list) => [...list, created]);
        this.newName.set('');
        this.newStatus.set('Off');
      },
      error: () => this.error.set('Unable to create the appliance'),
    });
  }

  onSwitchOnAll() {
    this.service.switchAll('On').subscribe({
      next: () => this.load(),
      error: () => this.error.set('Unable to switch on all appliances'),
    });
  }

  onSwitchOffAll() {
    if (!confirm('Are you sure you want to switch off all your appliances?')) return;
    this.service.switchAll('Off').subscribe({
      next: () => this.load(),
      error: () => this.error.set('Unable to switch off all appliances'),
    });
  }
}
