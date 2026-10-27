import { Component, inject, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  imports: [FormsModule, RouterLink],
  templateUrl: './appareil.html',
  styleUrl: './appareil.css',
})
export class Appareil {
  private appareilService = inject(AppareilService);

  appareilId     = input.required<string>();
  appareilName   = model.required<string>();
  appareilStatus = input.required<'On' | 'Off'>();

  changed = output<void>();   // ← signale au parent de recharger

  onSwitch() {
    const action = this.appareilStatus() === 'On'
      ? this.appareilService.switchOff(this.appareilId())
      : this.appareilService.switchOn(this.appareilId());

    action.subscribe({
      next: () => this.changed.emit(),
      error: (err) => console.error('Erreur switch', err),
    });
  }
}