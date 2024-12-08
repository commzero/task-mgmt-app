import { Component, OnInit, NgZone } from '@angular/core';
import { HeaderComponent } from './core/components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isHeaderVisible: boolean = true;

  constructor(private router: Router, private zone: NgZone) {
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        this.isHeaderVisible = this.router.url !== '/login';
      });
    });
  }
  

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }

}
