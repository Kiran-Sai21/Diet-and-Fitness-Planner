import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card animate-fade-in">
        <div class="auth-header">
          <div class="auth-icon">
            <span class="material-icons">lock_open</span>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue your fitness journey</p>
        </div>

        <form (ngSubmit)="onLogin()" class="auth-form">
          <div class="form-group">
            <label>Username</label>
            <div class="input-wrapper">
              <span class="material-icons input-icon">person</span>
              <input type="text" class="form-control with-icon" [(ngModel)]="username" name="username"
                     placeholder="Enter your username" required>
            </div>
          </div>

          <div class="form-group">
            <label>Password</label>
            <div class="input-wrapper">
              <span class="material-icons input-icon">lock</span>
              <input type="password" class="form-control with-icon" [(ngModel)]="password" name="password"
                     placeholder="Enter your password" required>
            </div>
          </div>

          <div class="error-msg" *ngIf="error">
            <span class="material-icons">error</span> {{ error }}
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-full" [disabled]="loading">
            <span *ngIf="loading" class="spinner"></span>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register">Create one</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      background: var(--bg-primary);
    }
    .auth-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 48px 40px;
      width: 100%;
      max-width: 460px;
      box-shadow: var(--shadow-lg);
    }
    .auth-header {
      text-align: center;
      margin-bottom: 36px;
    }
    .auth-icon {
      width: 64px;
      height: 64px;
      border-radius: var(--radius-full);
      background: var(--gradient-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    .auth-icon .material-icons { color: white; font-size: 1.8rem; }
    .auth-header h2 {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .auth-header p { color: var(--text-secondary); }
    .input-wrapper {
      position: relative;
    }
    .input-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 1.2rem;
    }
    .form-control.with-icon {
      padding-left: 44px;
    }
    .error-msg {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--danger);
      background: rgba(255,71,87,0.1);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      margin-bottom: 20px;
      font-size: 0.9rem;
    }
    .btn-full { width: 100%; }
    .auth-footer {
      text-align: center;
      margin-top: 24px;
      color: var(--text-secondary);
    }
    .auth-footer a {
      color: var(--primary);
      font-weight: 600;
    }
    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      display: inline-block;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.error = '';
    this.loading = true;
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Invalid credentials. Please try again.';
      }
    });
  }
}
