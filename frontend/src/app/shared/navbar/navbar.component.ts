import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" *ngIf="showNavbar()">
      <div class="nav-container">
        <a routerLink="/" class="nav-brand">
          <span class="brand-icon">🏋️</span>
          <span class="brand-text">Diet & Fitness<span class="brand-accent">Planner</span></span>
        </a>

        <button class="mobile-toggle" (click)="menuOpen = !menuOpen">
          <span class="hamburger" [class.active]="menuOpen"></span>
        </button>

        <div class="nav-links" [class.open]="menuOpen">
          <ng-container *ngIf="!auth.isLoggedIn()">
            <a routerLink="/login" routerLinkActive="active" class="nav-link" (click)="menuOpen=false">Login</a>
            <a routerLink="/register" class="btn btn-primary btn-sm" (click)="menuOpen=false">Get Started</a>
          </ng-container>

          <ng-container *ngIf="auth.isLoggedIn() && !auth.isAdmin()">
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-link" (click)="menuOpen=false">
              <span class="material-icons">dashboard</span> Dashboard
            </a>
            <a routerLink="/history" routerLinkActive="active" class="nav-link" (click)="menuOpen=false">
              <span class="material-icons">history</span> History
            </a>
            <a routerLink="/profile" routerLinkActive="active" class="nav-link" (click)="menuOpen=false">
              <span class="material-icons">person</span> Profile
            </a>
          </ng-container>

          <ng-container *ngIf="auth.isLoggedIn() && auth.isAdmin()">
            <a routerLink="/admin" routerLinkActive="active" class="nav-link" (click)="menuOpen=false">
              <span class="material-icons">admin_panel_settings</span> Admin Panel
            </a>
          </ng-container>

          <button class="theme-toggle" (click)="theme.toggleTheme()" title="Toggle Theme">
            <span class="material-icons">{{ theme.isDarkMode() ? 'light_mode' : 'dark_mode' }}</span>
          </button>

          <button *ngIf="auth.isLoggedIn()" class="btn btn-sm btn-logout" (click)="auth.logout(); menuOpen=false">
            <span class="material-icons">logout</span> Logout
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      padding: 0 24px;
      position: sticky;
      top: 0;
      z-index: 1000;
      backdrop-filter: blur(20px);
    }
    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-primary);
    }
    .brand-icon { font-size: 1.8rem; }
    .brand-text {
      font-size: 1.25rem;
      font-weight: 700;
    }
    .brand-accent { color: var(--primary); }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      text-decoration: none;
    }
    .nav-link .material-icons { font-size: 1.1rem; }
    .nav-link:hover, .nav-link.active {
      background: rgba(108,99,255,0.1);
      color: var(--primary);
    }
    .theme-toggle {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-secondary);
      transition: all 0.3s ease;
    }
    .theme-toggle:hover {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }
    .btn-logout {
      background: rgba(255,71,87,0.1);
      color: var(--danger);
      border: none;
      cursor: pointer;
    }
    .btn-logout:hover {
      background: var(--danger);
      color: white;
    }
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
    }
    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      position: relative;
      transition: 0.3s;
    }
    .hamburger::before, .hamburger::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      transition: 0.3s;
    }
    .hamburger::before { top: -7px; }
    .hamburger::after { top: 7px; }
    .hamburger.active { background: transparent; }
    .hamburger.active::before { transform: rotate(45deg); top: 0; }
    .hamburger.active::after { transform: rotate(-45deg); top: 0; }

    @media (max-width: 768px) {
      .mobile-toggle { display: block; }
      .nav-links {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        flex-direction: column;
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
      }
      .nav-links.open { display: flex; }
    }
  `]
})
export class NavbarComponent {
  menuOpen = false;
  constructor(public auth: AuthService, public theme: ThemeService) {}
  showNavbar(): boolean { return true; }
}
