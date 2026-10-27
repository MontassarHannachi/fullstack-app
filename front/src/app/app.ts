import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Premier } from './premier/premier';
import { Appareil } from './appareil/appareil';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Premier, Appareil],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  allowed = signal(false);

  appareilList = [
    { name: 'Washing machine', status: 'Off' },
    { name: 'TV', status: 'On' },
    { name: 'Air conditioner', status: 'Off' },
    { name: 'PC', status: 'On' },
    { name: 'Microwave', status: 'Off' },
    { name: 'Oven', status: 'On' },
    { name: 'Vacuum cleaner', status: 'Off' },
  ];

  constructor() {
    setTimeout(() => this.allowed.set(true), 4000);
  }

  onSwitchOnAll() {
    console.log('All appliances switched on');
  }
}
