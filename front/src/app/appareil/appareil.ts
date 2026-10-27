import { Component, inject, input, model } from '@angular/core';
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

  appareilName = model.required<string>();
  appareilStatus = input.required<string>();
  index = input.required<number>();

  onSwitch() {
    if (this.appareilStatus() === 'On') {
      this.appareilService.switchOffOne(this.index());
    } else {
      this.appareilService.switchOnOne(this.index());
    }
  }
}

