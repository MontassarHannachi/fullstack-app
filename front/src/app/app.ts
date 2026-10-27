import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Premier } from './premier/premier';
import { Appareil } from './appareil/appareil';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Premier, Appareil],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
