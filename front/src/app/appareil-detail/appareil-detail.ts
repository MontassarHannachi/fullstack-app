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

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const index = Number(params.get('id'));
      const found = Number.isInteger(index) ? this.appareilService.appareilList[index] : undefined;
      this.appareil.set(found ?? null);
    });
  }
}
