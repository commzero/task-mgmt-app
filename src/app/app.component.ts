import { Component } from '@angular/core';
import { HeaderComponent } from './core/components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
}
