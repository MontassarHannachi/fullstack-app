import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Premier } from './premier/premier';
import { Appareil } from './appareil/appareil';
import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Premier, Appareil],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private appareilService = inject(AppareilService);

  allowed = signal(false);
  appareilList: { name: string; status: string }[] = [];

  constructor() {
    setTimeout(() => this.allowed.set(true), 4000);
  }

  ngOnInit() {
    this.appareilList = this.appareilService.appareilList;
  }

  onSwitchOnAll() {
    this.appareilService.switchOnAll();
  }

  onSwitchOffAll() {
    if (confirm('Are you sure you want to switch off all your appliances?')) {
      this.appareilService.switchOffAll();
    }
  }
}
