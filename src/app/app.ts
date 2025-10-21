import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toolbar} from './toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet/>
  `,
  styleUrl: './app.css'
})
export class App {
}
