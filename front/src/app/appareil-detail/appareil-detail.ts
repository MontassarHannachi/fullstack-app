import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-detail',
  imports: [RouterLink],
  templateUrl: './appareil-detail.html',
  styleUrl: './appareil-detail.css',
})
export class AppareilDetail {
  private route = inject(ActivatedRoute);
  private appareilService = inject(AppareilService);

  appareil = signal<{ name: string; status: string } | null>(null);
  currentIndex: number | null = null;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const index = Number(params.get('id'));
      this.currentIndex = Number.isInteger(index) ? index : null;
      const found = this.currentIndex !== null
        ? this.appareilService.appareilList[this.currentIndex]
        : undefined;
      this.appareil.set(found ? { ...found } : null);
    });
  }

  onSwitchOn() {
    if (this.currentIndex !== null) {
      this.appareilService.switchOnOne(this.currentIndex);
      this.refresh();
    }
  }

  onSwitchOff() {
    if (this.currentIndex !== null) {
      this.appareilService.switchOffOne(this.currentIndex);
      this.refresh();
    }
  }

  private refresh() {
    if (this.currentIndex !== null) {
      const a = this.appareilService.appareilList[this.currentIndex];
      this.appareil.set(a ? { ...a } : null);   // clone → le signal voit le changement
    }
  }
}