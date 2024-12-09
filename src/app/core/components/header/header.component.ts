import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, DialogModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showLogoutDialog: boolean = false;
  username = localStorage.getItem('username');

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => this.router.navigate(['/tasks']),
    },
  ];

  logout(): void {
    this.showLogoutDialog = true;
  }

  confirmLogout(): void {
    this.userService.logout();
    this.showLogoutDialog = false;
  }

  cancelLogout(): void {
    this.showLogoutDialog = false;
  }
}
