import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appareil as AppareilModel } from '../models/appareil.model';

@Component({
  selector: 'app-appareil',
  imports: [RouterLink],
  templateUrl: './appareil.html',
  styleUrl: './appareil.css',
})
export class Appareil {
  appareil = input.required<AppareilModel>();
  switched = output<AppareilModel>();
  removed = output<AppareilModel>();
}
