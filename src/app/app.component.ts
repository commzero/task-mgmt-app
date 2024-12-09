import { Component, NgZone } from '@angular/core';
import { HeaderComponent } from './core/components/header/header.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isHeaderVisible: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.zone.run(() => {
          const currentRoute = this.getActivatedRoute(this.activatedRoute);
          const isNotFoundRoute = currentRoute.routeConfig?.path === '**';
          this.isHeaderVisible =
            !isNotFoundRoute && this.router.url !== '/login';
        });
      }
    });
  }

  getActivatedRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
