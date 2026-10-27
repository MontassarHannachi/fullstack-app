import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { Appareil } from '../models/appareil.model';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-detail',
  imports: [RouterLink],
  templateUrl: './appareil-detail.html',
  styleUrl: './appareil-detail.css',
})
export class AppareilDetail {
  private route = inject(ActivatedRoute);
  private service = inject(AppareilService);

  appareil = signal<Appareil | null>(null);
  loading = signal(true);

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.service.getAppareil(params.get('id') ?? '').pipe(catchError(() => of(null)))
        )
      )
      .subscribe((a) => {
        this.appareil.set(a);
        this.loading.set(false);
      });
  }
}
