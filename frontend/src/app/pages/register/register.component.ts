import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="reg-page">
      <!-- Left decorative panel -->
      <div class="reg-panel">
        <div class="panel-logo">
          <span class="material-icons">self_improvement</span>
          <span class="panel-brand">FitPlan</span>
        </div>
        <div class="panel-tagline">
          <h2>Your journey to a<br><em>healthier you</em> starts here.</h2>
          <p>Personalised meals, workouts and progress tracking — all in one place.</p>
        </div>
        <div class="panel-stats">
          <div class="pstat">
            <span class="pstat-num">12+</span>
            <span class="pstat-label">Workout Plans</span>
          </div>
          <div class="pstat">
            <span class="pstat-num">4</span>
            <span class="pstat-label">Fitness Goals</span>
          </div>
          <div class="pstat">
            <span class="pstat-num">100%</span>
            <span class="pstat-label">Personalised</span>
          </div>
        </div>
      </div>

      <!-- Right form panel -->
      <div class="reg-form-wrap">
        <div class="reg-card animate-fade-in">
          <div class="reg-header">
            <h2>Create your account</h2>
            <p>Fill in a few details and we'll set everything up for you.</p>
          </div>

          <form (ngSubmit)="onRegister()" class="auth-form" novalidate>

            <div class="section-label">Personal Details</div>
            <div class="form-grid">
              <!-- Full Name -->
              <div class="form-group" [class.has-error]="getError('name')" [class.is-valid]="isValid('name')">
                <label>Full Name</label>
                <div class="field-wrap">
                  <input type="text" class="form-control"
                         [(ngModel)]="form.name" name="name"
                         (blur)="touch('name')" (input)="touch('name')"
                         maxlength="100" placeholder="John Doe">
                  <span class="field-icon valid-icon material-icons" *ngIf="isValid('name')">check_circle</span>
                  <span class="field-icon error-icon material-icons" *ngIf="getError('name')">error</span>
                </div>
                <div class="field-error-msg" *ngIf="getError('name')">{{ getError('name') }}</div>
              </div>

              <!-- Phone -->
              <div class="form-group" [class.has-error]="getError('phone')" [class.is-valid]="isValid('phone')">
                <label>Phone Number <span class="label-hint">digits only</span></label>
                <div class="field-wrap">
                  <input type="tel" class="form-control"
                         [(ngModel)]="form.phone" name="phone"
                         (blur)="touch('phone')" (input)="touch('phone')"
                         maxlength="15" placeholder="9876543210">
                  <span class="field-icon valid-icon material-icons" *ngIf="isValid('phone')">check_circle</span>
                  <span class="field-icon error-icon material-icons" *ngIf="getError('phone')">error</span>
                </div>
                <div class="field-error-msg" *ngIf="getError('phone')">{{ getError('phone') }}</div>
              </div>

              <!-- Username -->
              <div class="form-group" [class.has-error]="getError('username')" [class.is-valid]="isValid('username')">
                <label>Username</label>
                <div class="field-wrap">
                  <input type="text" class="form-control"
                         [(ngModel)]="form.username" name="username"
                         (blur)="touch('username')" (input)="touch('username')"
                         maxlength="50" placeholder="johndoe">
                  <span class="field-icon valid-icon material-icons" *ngIf="isValid('username')">check_circle</span>
                  <span class="field-icon error-icon material-icons" *ngIf="getError('username')">error</span>
                </div>
                <div class="field-error-msg" *ngIf="getError('username')">{{ getError('username') }}</div>
              </div>

              <!-- Password -->
              <div class="form-group" [class.has-error]="getError('password')" [class.is-valid]="isValid('password')">
                <label>Password</label>
                <div class="field-wrap">
                  <input [type]="showPass ? 'text' : 'password'" class="form-control"
                         [(ngModel)]="form.password" name="password"
                         (blur)="touch('password')" (input)="touch('password')"
                         maxlength="100" placeholder="Min 6 characters">
                  <button type="button" class="toggle-pass" (click)="showPass = !showPass" tabindex="-1">
                    <span class="material-icons">{{ showPass ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
                <div class="pass-strength" *ngIf="form.password">
                  <div class="strength-bar">
                    <div class="strength-fill" [class]="passStrengthClass()" [style.width]="passStrengthWidth()"></div>
                  </div>
                  <span class="strength-label" [class]="passStrengthClass()">{{ passStrengthLabel() }}</span>
                </div>
                <div class="field-error-msg" *ngIf="getError('password')">{{ getError('password') }}</div>
              </div>

              <!-- Gender -->
              <div class="form-group" [class.has-error]="getError('gender')" [class.is-valid]="isValid('gender')">
                <label>Gender</label>
                <div class="gender-toggle">
                  <button type="button" class="gender-btn" [class.active]="form.gender === 'MALE'"
                          (click)="form.gender = 'MALE'; touch('gender')">
                    <span class="material-icons">male</span> Male
                  </button>
                  <button type="button" class="gender-btn" [class.active]="form.gender === 'FEMALE'"
                          (click)="form.gender = 'FEMALE'; touch('gender')">
                    <span class="material-icons">female</span> Female
                  </button>
                </div>
                <div class="field-error-msg" *ngIf="getError('gender')">{{ getError('gender') }}</div>
              </div>

              <!-- Age -->
              <div class="form-group" [class.has-error]="getError('age')" [class.is-valid]="isValid('age')">
                <label>Age <span class="label-hint">10 – 120</span></label>
                <div class="field-wrap">
                  <input type="number" class="form-control"
                         [(ngModel)]="form.age" name="age"
                         (blur)="touch('age')" (input)="touch('age')"
                         min="10" max="120" placeholder="25">
                  <span class="field-icon valid-icon material-icons" *ngIf="isValid('age')">check_circle</span>
                  <span class="field-icon error-icon material-icons" *ngIf="getError('age')">error</span>
                </div>
                <div class="field-error-msg" *ngIf="getError('age')">{{ getError('age') }}</div>
              </div>

              <!-- Height -->
              <div class="form-group" [class.has-error]="getError('heightCm')" [class.is-valid]="isValid('heightCm')">
                <label>Height <span class="label-hint">cm, 50 – 300</span></label>
                <div class="field-wrap">
                  <input type="number" class="form-control"
                         [(ngModel)]="form.heightCm" name="heightCm"
                         (blur)="touch('heightCm')" (input)="touch('heightCm')"
                         min="50" max="300" placeholder="170">
                  <span class="field-icon valid-icon material-icons" *ngIf="isValid('heightCm')">check_circle</span>
                  <span class="field-icon error-icon material-icons" *ngIf="getError('heightCm')">error</span>
                </div>
                <div class="field-error-msg" *ngIf="getError('heightCm')">{{ getError('heightCm') }}</div>
              </div>

              <!-- Weight -->
              <div class="form-group" [class.has-error]="getError('weightKg')" [class.is-valid]="isValid('weightKg')">
                <label>Weight <span class="label-hint">kg, 20 – 500</span></label>
                <div class="field-wrap">
                  <input type="number" class="form-control"
                         [(ngModel)]="form.weightKg" name="weightKg"
                         (blur)="touch('weightKg')" (input)="touch('weightKg')"
                         min="20" max="500" placeholder="70">
                  <span class="field-icon valid-icon material-icons" *ngIf="isValid('weightKg')">check_circle</span>
                  <span class="field-icon error-icon material-icons" *ngIf="getError('weightKg')">error</span>
                </div>
                <div class="field-error-msg" *ngIf="getError('weightKg')">{{ getError('weightKg') }}</div>
              </div>

              <!-- Diet Preference -->
              <div class="form-group" [class.has-error]="getError('dietPreference')" [class.is-valid]="isValid('dietPreference')">
                <label>Diet Preference</label>
                <div class="gender-toggle">
                  <button type="button" class="gender-btn" [class.active]="form.dietPreference === 'VEG'"
                          (click)="form.dietPreference = 'VEG'; touch('dietPreference')">
                    <span class="material-icons">eco</span> Vegetarian
                  </button>
                  <button type="button" class="gender-btn" [class.active]="form.dietPreference === 'NON_VEG'"
                          (click)="form.dietPreference = 'NON_VEG'; touch('dietPreference')">
                    <span class="material-icons">set_meal</span> Non-Veg
                  </button>
                </div>
                <div class="field-error-msg" *ngIf="getError('dietPreference')">{{ getError('dietPreference') }}</div>
              </div>

              <!-- Workout Level -->
              <div class="form-group level-group" [class.has-error]="getError('workoutLevel')" [class.is-valid]="isValid('workoutLevel')">
                <label>Current Fitness Level</label>
                <div class="level-toggle">
                  <button type="button" class="level-btn" [class.active]="form.workoutLevel === 'BEGINNER'"
                          (click)="form.workoutLevel = 'BEGINNER'; touch('workoutLevel')">
                    <span class="material-icons">directions_walk</span>
                    <span>Beginner</span>
                  </button>
                  <button type="button" class="level-btn" [class.active]="form.workoutLevel === 'INTERMEDIATE'"
                          (click)="form.workoutLevel = 'INTERMEDIATE'; touch('workoutLevel')">
                    <span class="material-icons">directions_run</span>
                    <span>Intermediate</span>
                  </button>
                  <button type="button" class="level-btn" [class.active]="form.workoutLevel === 'HARD'"
                          (click)="form.workoutLevel = 'HARD'; touch('workoutLevel')">
                    <span class="material-icons">sports_martial_arts</span>
                    <span>Advanced</span>
                  </button>
                </div>
                <div class="field-error-msg" *ngIf="getError('workoutLevel')">{{ getError('workoutLevel') }}</div>
              </div>
            </div>

            <!-- Fitness Goal -->
            <div class="section-label" style="margin-top: 8px;">Fitness Goal</div>
            <div class="goal-grid">
              <label class="goal-card" *ngFor="let g of goals"
                     [class.selected]="form.goal === g.value"
                     (click)="form.goal = g.value; goalTouched = true">
                <div class="goal-icon-wrap">
                  <span class="material-icons">{{ g.icon }}</span>
                </div>
                <div class="goal-text">
                  <span class="goal-name">{{ g.label }}</span>
                  <span class="goal-desc">{{ g.desc }}</span>
                </div>
                <span class="goal-check material-icons" *ngIf="form.goal === g.value">check_circle</span>
              </label>
            </div>
            <div class="field-error-msg" *ngIf="goalTouched && !form.goal" style="margin-top: 4px;">Please select a fitness goal</div>

            <div class="submit-error" *ngIf="error">
              <span class="material-icons">warning</span>
              <span>{{ error }}</span>
            </div>

            <button type="submit" class="btn-submit" [disabled]="loading">
              <span *ngIf="!loading">Create Account</span>
              <span *ngIf="loading" class="submitting">
                <span class="spinner-ring"></span> Setting up your account...
              </span>
            </button>
          </form>

          <div class="reg-footer">
            <p>Already have an account? <a routerLink="/login">Sign in here</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reg-page {
      min-height: calc(100vh - 70px);
      display: flex;
    }

    /* Left Panel */
    .reg-panel {
      width: 380px;
      min-width: 380px;
      background: linear-gradient(160deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%);
      padding: 60px 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: sticky;
      top: 0;
      height: calc(100vh - 70px);
    }
    .panel-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      font-size: 1.3rem;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .panel-logo .material-icons {
      font-size: 2rem;
      color: #00C9A7;
    }
    .panel-tagline h2 {
      font-size: 2rem;
      font-weight: 800;
      color: white;
      line-height: 1.3;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }
    .panel-tagline h2 em {
      color: #00C9A7;
      font-style: normal;
    }
    .panel-tagline p {
      color: rgba(255,255,255,0.6);
      font-size: 0.95rem;
      line-height: 1.7;
    }
    .panel-stats {
      display: flex;
      gap: 28px;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 32px;
    }
    .pstat { text-align: left; }
    .pstat-num {
      display: block;
      font-size: 1.8rem;
      font-weight: 800;
      color: white;
      line-height: 1;
    }
    .pstat-label {
      display: block;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.45);
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Right Form */
    .reg-form-wrap {
      flex: 1;
      overflow-y: auto;
      padding: 48px 52px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    .reg-card {
      width: 100%;
      max-width: 640px;
    }
    .reg-header {
      margin-bottom: 32px;
    }
    .reg-header h2 {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 6px;
      letter-spacing: -0.5px;
    }
    .reg-header p {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .section-label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: var(--text-muted);
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-color);
    }

    /* Form Grid */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 28px;
    }
    .level-group {
      grid-column: 1 / -1;
    }

    /* Form Group states */
    .form-group { margin-bottom: 0; }
    .form-group label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 7px;
    }
    .label-hint {
      font-size: 0.75rem;
      font-weight: 400;
      color: var(--text-muted);
    }
    .field-wrap { position: relative; }
    .field-wrap .form-control { padding-right: 40px; }
    .field-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.1rem;
      pointer-events: none;
    }
    .valid-icon { color: #4ECB71; }
    .error-icon { color: var(--danger); }

    .has-error .form-control { border-color: var(--danger); }
    .is-valid .form-control { border-color: #4ECB71; }

    .field-error-msg {
      color: var(--danger);
      font-size: 0.78rem;
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 4px;
      animation: slideDown 0.2s ease;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Password toggle */
    .toggle-pass {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-muted);
      padding: 2px;
      display: flex;
    }
    .toggle-pass .material-icons { font-size: 1.1rem; }

    /* Password strength */
    .pass-strength {
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .strength-bar {
      flex: 1;
      height: 4px;
      background: var(--border-color);
      border-radius: 4px;
      overflow: hidden;
    }
    .strength-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease, background 0.3s ease;
    }
    .strength-fill.weak { background: var(--danger); }
    .strength-fill.fair { background: var(--warning); }
    .strength-fill.good { background: var(--info); }
    .strength-fill.strong { background: var(--success); }
    .strength-label { font-size: 0.72rem; font-weight: 600; }
    .strength-label.weak { color: var(--danger); }
    .strength-label.fair { color: var(--warning); }
    .strength-label.good { color: var(--info); }
    .strength-label.strong { color: var(--success); }

    /* Gender / Diet Toggle buttons */
    .gender-toggle {
      display: flex;
      gap: 10px;
    }
    .gender-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 14px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.22s ease;
      font-family: 'Inter', sans-serif;
    }
    .gender-btn .material-icons { font-size: 1.1rem; }
    .gender-btn:hover { border-color: var(--primary-light); color: var(--primary); }
    .gender-btn.active {
      border-color: var(--primary);
      background: rgba(108,99,255,0.08);
      color: var(--primary);
    }

    /* Level Toggle */
    .level-toggle {
      display: flex;
      gap: 10px;
    }
    .level-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 14px 10px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.22s ease;
      font-family: 'Inter', sans-serif;
    }
    .level-btn .material-icons { font-size: 1.4rem; }
    .level-btn:hover { border-color: var(--primary-light); color: var(--primary); }
    .level-btn.active {
      border-color: var(--primary);
      background: rgba(108,99,255,0.08);
      color: var(--primary);
    }

    /* Goal Cards */
    .goal-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 28px;
    }
    .goal-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 16px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.22s ease;
      background: var(--bg-secondary);
      position: relative;
    }
    .goal-card:hover { border-color: var(--primary-light); }
    .goal-card.selected {
      border-color: var(--primary);
      background: rgba(108,99,255,0.06);
    }
    .goal-icon-wrap {
      width: 40px; height: 40px; min-width: 40px;
      border-radius: 10px;
      background: rgba(108,99,255,0.1);
      display: flex; align-items: center; justify-content: center;
    }
    .goal-card.selected .goal-icon-wrap { background: rgba(108,99,255,0.18); }
    .goal-icon-wrap .material-icons { font-size: 1.3rem; color: var(--primary); }
    .goal-text { display: flex; flex-direction: column; gap: 2px; flex: 1; }
    .goal-name { font-size: 0.88rem; font-weight: 700; color: var(--text-primary); }
    .goal-desc { font-size: 0.75rem; color: var(--text-muted); line-height: 1.4; }
    .goal-check {
      position: absolute;
      top: 10px; right: 10px;
      font-size: 1rem;
      color: var(--primary);
    }

    /* Submit button */
    .btn-submit {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #6C63FF 0%, #00C9A7 100%);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 4px 18px rgba(108,99,255,0.35);
      margin-top: 4px;
    }
    .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(108,99,255,0.45); }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .submitting { display: flex; align-items: center; justify-content: center; gap: 10px; }
    .spinner-ring {
      width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,0.35);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      display: inline-block;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Submit error */
    .submit-error {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,71,87,0.08);
      border: 1px solid rgba(255,71,87,0.3);
      color: var(--danger);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      margin-bottom: 16px;
      font-size: 0.88rem;
      font-weight: 500;
    }
    .submit-error .material-icons { font-size: 1.1rem; }

    .reg-footer {
      text-align: center;
      margin-top: 24px;
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    .reg-footer a { color: var(--primary); font-weight: 600; }

    @media (max-width: 900px) {
      .reg-panel { display: none; }
      .reg-form-wrap { padding: 32px 20px; }
    }
    @media (max-width: 600px) {
      .form-grid { grid-template-columns: 1fr; }
      .goal-grid { grid-template-columns: 1fr; }
      .level-toggle { flex-direction: column; }
    }
  `]
})
export class RegisterComponent {
  form: any = {
    name: '', phone: '', username: '', password: '',
    gender: '', age: null, heightCm: null, weightKg: null,
    dietPreference: '', workoutLevel: '', goal: ''
  };
  touched: Record<string, boolean> = {};
  goalTouched = false;
  showPass = false;
  error = '';
  loading = false;

  goals = [
    { value: 'OVERALL_HEALTH',     label: 'Overall Health',     icon: 'favorite',        desc: 'Balanced lifestyle & general wellness' },
    { value: 'MUSCULAR_STRENGTH',  label: 'Build Muscle',       icon: 'fitness_center',  desc: 'Gain strength and lean muscle mass' },
    { value: 'WEIGHT_LOSS',        label: 'Lose Weight',        icon: 'trending_down',   desc: 'Burn fat and reach your ideal weight' },
    { value: 'DIABETIC_BP_CONTROL',label: 'Diabetic/BP Control',icon: 'health_and_safety',desc: 'Manage blood sugar & blood pressure' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  touch(field: string) { this.touched[field] = true; }

  getError(field: string): string {
    if (!this.touched[field]) return '';
    switch (field) {
      case 'name':
        if (!this.form.name || this.form.name.trim().length < 2)
          return 'Name must be at least 2 characters long';
        break;
      case 'phone':
        if (!this.form.phone) return 'Phone number is required';
        if (!/^\d{10}$/.test(this.form.phone))
          return 'Enter 10 digits only (no spaces, no symbols)';
        break;
      case 'username':
        if (!this.form.username || this.form.username.trim().length < 3)
          return 'Username must be at least 3 characters';
        break;
      case 'password':
        if (!this.form.password || this.form.password.length < 6)
          return 'Password must be at least 6 characters';
        break;
      case 'gender':
        if (!this.form.gender) return 'Please select your gender';
        break;
      case 'age':
        if (!this.form.age) return 'Age is required';
        if (this.form.age < 10 || this.form.age > 80) return 'Age must be between 10 and 80';
        break;
      case 'heightCm':
        if (!this.form.heightCm) return 'Height is required';
        if (this.form.heightCm < 50 || this.form.heightCm > 300) return 'Height must be 50–300 cm';
        break;
      case 'weightKg':
        if (!this.form.weightKg) return 'Weight is required';
        if (this.form.weightKg < 20 || this.form.weightKg > 500) return 'Weight must be 20–500 kg';
        break;
      case 'dietPreference':
        if (!this.form.dietPreference) return 'Please select a diet preference';
        break;
      case 'workoutLevel':
        if (!this.form.workoutLevel) return 'Please select your fitness level';
        break;
    }
    return '';
  }

  isValid(field: string): boolean {
    return !!this.touched[field] && !this.getError(field);
  }

  passStrengthClass(): string {
    const p = this.form.password || '';
    if (p.length < 6) return 'weak';
    const hasUpper = /[A-Z]/.test(p);
    const hasNum = /\d/.test(p);
    const hasSpec = /[^A-Za-z0-9]/.test(p);
    const score = (hasUpper ? 1 : 0) + (hasNum ? 1 : 0) + (hasSpec ? 1 : 0);
    if (p.length >= 12 && score === 3) return 'strong';
    if (p.length >= 8 && score >= 2) return 'good';
    if (p.length >= 6 && score >= 1) return 'fair';
    return 'weak';
  }

  passStrengthWidth(): string {
    const m: Record<string, string> = { weak: '25%', fair: '50%', good: '75%', strong: '100%' };
    return m[this.passStrengthClass()];
  }

  passStrengthLabel(): string {
    const m: Record<string, string> = { weak: 'Weak', fair: 'Fair', good: 'Good', strong: 'Strong' };
    return m[this.passStrengthClass()];
  }

  onRegister() {
    const allFields = ['name','phone','username','password','gender','age','heightCm','weightKg','dietPreference','workoutLevel'];
    allFields.forEach(f => this.touched[f] = true);
    this.goalTouched = true;

    if (!this.form.goal) { this.error = 'Please select a fitness goal to continue'; return; }

    const hasFieldErrors = allFields.some(f => this.getError(f));
    if (hasFieldErrors) { this.error = 'Please correct the highlighted fields before continuing'; return; }

    this.error = '';
    this.loading = true;
    this.authService.register(this.form).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/dashboard']); },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || err.error?.username || 'Registration failed. Please try again.';
      }
    });
  }
}
