import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appareil',
  imports: [FormsModule],
  templateUrl: './appareil.html',
  styleUrl: './appareil.css',
})
export class Appareil {
  // model() = input + output : permet le binding bidirectionnel [(ngModel)]
  appareilName = model.required<string>();
  appareilStatus = input.required<string>();
}
