import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Navbar } from './@Component/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('burkolo-frontend');
}
