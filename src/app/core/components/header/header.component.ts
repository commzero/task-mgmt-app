import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, DialogModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showLogoutDialog: boolean = false;
  username = localStorage.getItem('username');

  constructor(
    private userService: UserService,
    private messageService: MessageService,
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
    this.messageService.add({
      severity: 'info',
      summary: 'Logout Cancelled',
    });
  }
}
