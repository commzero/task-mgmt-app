import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { DialogModule } from 'primeng/dialog';
import { ThemeLinks } from '../../utilities/themes.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, DialogModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showLogoutDialog: boolean = false;
  username = localStorage.getItem('username');
  currentTheme: 'blue-saga' | 'lara-dark-blue' = 'blue-saga';
  themeLinks: { 'blue-saga': string; 'lara-dark-blue': string } = ThemeLinks;

  constructor(private userService: UserService, private router: Router) {}

  menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => this.router.navigate(['/tasks']),
    },
  ];

  ngOnInit(): void {
    this.setTheme(this.currentTheme);
  }

  toggleTheme(): void {
    console.log('Toggling theme');
    this.currentTheme = this.currentTheme === 'blue-saga' ? 'lara-dark-blue' : 'blue-saga';
    this.setTheme(this.currentTheme);
  }

  setTheme(theme: 'blue-saga' | 'lara-dark-blue'): void {
    let themeLink = document.getElementById('theme-link') as HTMLLinkElement;
  
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = 'theme-link';
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }
  
    themeLink.href = this.themeLinks[theme]; // Update the href attribute dynamically
  }

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
