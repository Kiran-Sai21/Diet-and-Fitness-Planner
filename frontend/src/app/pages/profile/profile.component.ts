import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-page" *ngIf="profile">

      <!-- Hero Profile Card -->
      <div class="profile-hero animate-fade-in">
        <div class="hero-left">
          <div class="avatar-ring">
            <div class="avatar-inner">
              <span class="material-icons">person</span>
            </div>
          </div>
          <div class="hero-info">
            <h2>{{ profile.name }}</h2>
            <p class="hero-username">&#64;{{ profile.username }}</p>
            <div class="hero-tags">
              <span class="htag htag-role">
                <span class="material-icons">verified</span>
                {{ profile.role }}
              </span>
              <span class="htag htag-level" [ngClass]="levelClass()">
                <span class="material-icons">{{ levelIcon() }}</span>
                {{ levelLabel() }}
              </span>
              <span class="htag htag-goal">
                <span class="material-icons">{{ goalIcon() }}</span>
                {{ goalLabel() }}
              </span>
            </div>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hstat">
            <div class="hstat-icon bmi-ic"><span class="material-icons">monitor_weight</span></div>
            <div class="hstat-data">
              <span class="hstat-val">{{ profile.bmi }}</span>
              <span class="hstat-lbl">BMI</span>
            </div>
          </div>
          <div class="hstat-divider"></div>
          <div class="hstat">
            <div class="hstat-icon fire-ic"><span class="material-icons">local_fire_department</span></div>
            <div class="hstat-data">
              <span class="hstat-val">{{ profile.streakCount }}</span>
              <span class="hstat-lbl">Day Streak</span>
            </div>
          </div>
          <div class="hstat-divider"></div>
          <div class="hstat">
            <div class="hstat-icon pts-ic"><span class="material-icons">emoji_events</span></div>
            <div class="hstat-data">
              <span class="hstat-val">{{ profile.rewardPoints }}</span>
              <span class="hstat-lbl">Points</span>
            </div>
          </div>
          <div class="hstat-divider"></div>
          <div class="hstat">
            <div class="hstat-icon bdg-ic"><span class="material-icons">workspace_premium</span></div>
            <div class="hstat-data">
              <span class="hstat-val badge-text">{{ profile.badge }}</span>
              <span class="hstat-lbl">Badge</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Form -->
      <div class="edit-wrap">
        <div class="edit-section card">
          <div class="section-head">
            <span class="material-icons">manage_accounts</span>
            <div>
              <h3>Personal Information</h3>
              <p>Update your basic details and contact info</p>
            </div>
          </div>
          <form (ngSubmit)="saveProfile()">
            <div class="form-grid">
              <div class="form-group" [class.has-error]="profileError && profileError.includes('Name')" [class.is-valid]="profile.name && profile.name.length >= 2">
                <label>Full Name</label>
                <input class="form-control" [(ngModel)]="profile.name" name="name"
                       (blur)="validatePhone()" minlength="2" maxlength="100">
              </div>
              <div class="form-group" [class.has-error]="phoneErr">
                <label>Phone Number <span class="label-hint">10 digits only</span></label>
                <div class="field-wrap">
                  <input class="form-control" [(ngModel)]="profile.phone" name="phone"
                         (blur)="validatePhone()" (input)="phoneErr = ''"
                         maxlength="10" placeholder="9876543210">
                  <span class="field-icon error-icon material-icons" *ngIf="phoneErr">error</span>
                </div>
                <div class="field-error-msg" *ngIf="phoneErr">{{ phoneErr }}</div>
              </div>
              <div class="form-group">
                <label>Age <span class="label-hint">10 – 120</span></label>
                <input type="number" class="form-control" [(ngModel)]="profile.age" name="age" min="10" max="120">
              </div>
              <div class="form-group">
                <label>Height <span class="label-hint">cm</span></label>
                <input type="number" class="form-control" [(ngModel)]="profile.heightCm" name="heightCm" min="50" max="300">
              </div>
              <div class="form-group">
                <label>Weight <span class="label-hint">kg</span></label>
                <input type="number" class="form-control" [(ngModel)]="profile.weightKg" name="weightKg" min="20" max="500">
              </div>
              <div class="form-group">
                <label>Diet Preference</label>
                <div class="toggle-row">
                  <button type="button" class="tog-btn" [class.active]="profile.dietPreference === 'VEG'"
                          (click)="profile.dietPreference = 'VEG'">
                    <span class="material-icons">eco</span> Vegetarian
                  </button>
                  <button type="button" class="tog-btn" [class.active]="profile.dietPreference === 'NON_VEG'"
                          (click)="profile.dietPreference = 'NON_VEG'">
                    <span class="material-icons">set_meal</span> Non-Veg
                  </button>
                </div>
              </div>
            </div>

            <!-- Fitness Settings -->
            <div class="fitness-block">
              <div class="fitness-block-head">
                <span class="material-icons">fitness_center</span>
                <div>
                  <h4>Fitness Settings</h4>
                  <p>Changes here update your dashboard plans immediately after saving.</p>
                </div>
              </div>

              <div class="fitness-fields">
                <div class="form-group">
                  <label>Fitness Level</label>
                  <div class="level-row">
                    <button type="button" class="lev-btn" [class.active]="profile.workoutLevel === 'BEGINNER'"
                            (click)="profile.workoutLevel = 'BEGINNER'">
                      <span class="material-icons">directions_walk</span>
                      <span>Beginner</span>
                    </button>
                    <button type="button" class="lev-btn" [class.active]="profile.workoutLevel === 'INTERMEDIATE'"
                            (click)="profile.workoutLevel = 'INTERMEDIATE'">
                      <span class="material-icons">directions_run</span>
                      <span>Intermediate</span>
                    </button>
                    <button type="button" class="lev-btn" [class.active]="profile.workoutLevel === 'HARD'"
                            (click)="profile.workoutLevel = 'HARD'">
                      <span class="material-icons">sports_martial_arts</span>
                      <span>Advanced</span>
                    </button>
                  </div>
                </div>

                <div class="form-group">
                  <label>Fitness Goal</label>
                  <div class="goal-row">
                    <button type="button" class="goal-opt" *ngFor="let g of goalOptions"
                            [class.active]="profile.goal === g.value"
                            (click)="profile.goal = g.value">
                      <span class="material-icons">{{ g.icon }}</span>
                      <span>{{ g.label }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="error-msg" *ngIf="profileError">
              <span class="material-icons">warning</span> {{ profileError }}
            </div>
            <div class="success-msg" *ngIf="saveMsg">
              <span class="material-icons">check_circle</span> {{ saveMsg }}
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-save" [disabled]="saving">
                <span *ngIf="!saving"><span class="material-icons">save</span> Save Changes</span>
                <span *ngIf="saving" class="saving-state">
                  <span class="sring"></span> Saving...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="profile-loading" *ngIf="!profile">
      <div class="loader"></div>
      <p>Loading profile...</p>
    </div>
  `,
  styles: [`
    .profile-page { max-width: 960px; margin: 0 auto; padding: 36px 24px 60px; }

    /* Hero Card */
    .profile-hero {
      background: linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%);
      border-radius: var(--radius-xl);
      padding: 36px 40px;
      margin-bottom: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      flex-wrap: wrap;
    }
    .hero-left { display: flex; align-items: center; gap: 24px; }
    .avatar-ring {
      width: 84px; height: 84px; min-width: 84px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6C63FF, #00C9A7);
      padding: 3px;
    }
    .avatar-inner {
      width: 100%; height: 100%;
      border-radius: 50%;
      background: #1A1A2E;
      display: flex; align-items: center; justify-content: center;
    }
    .avatar-inner .material-icons { color: white; font-size: 2.4rem; }
    .hero-info h2 { font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 4px; }
    .hero-username { color: rgba(255,255,255,0.45); font-size: 0.9rem; margin-bottom: 12px; }
    .hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }
    .htag {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 600;
    }
    .htag .material-icons { font-size: 0.95rem; }
    .htag-role { background: rgba(108,99,255,0.25); color: #A89CFF; }
    .htag-level { transition: all 0.3s ease; }
    .htag-level.lv-beginner  { background: rgba(59,130,246,0.2); color: #60A5FA; }
    .htag-level.lv-intermediate { background: rgba(255,184,77,0.2); color: #FBBF24; }
    .htag-level.lv-hard  { background: rgba(255,107,107,0.2); color: #F87171; }
    .htag-goal { background: rgba(0,201,167,0.2); color: #34D399; }

    /* Hero Stats */
    .hero-stats { display: flex; align-items: center; gap: 0; }
    .hstat { display: flex; align-items: center; gap: 12px; padding: 0 24px; }
    .hstat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.12); }
    .hstat-icon {
      width: 40px; height: 40px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
    }
    .hstat-icon .material-icons { font-size: 1.2rem; color: white; }
    .bmi-ic { background: rgba(108,99,255,0.3); }
    .fire-ic { background: rgba(255,107,107,0.3); }
    .pts-ic { background: rgba(255,184,77,0.3); }
    .bdg-ic { background: rgba(0,201,167,0.3); }
    .hstat-val { display: block; font-size: 1.3rem; font-weight: 800; color: white; line-height: 1; }
    .badge-text { font-size: 0.75rem !important; }
    .hstat-lbl { display: block; font-size: 0.72rem; color: rgba(255,255,255,0.45); margin-top: 3px; }

    /* Edit section */
    .edit-wrap { }
    .edit-section { padding: 32px 36px; }
    .section-head {
      display: flex; align-items: flex-start; gap: 14px;
      margin-bottom: 28px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-color);
    }
    .section-head .material-icons { font-size: 1.6rem; color: var(--primary); margin-top: 2px; }
    .section-head h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 3px; }
    .section-head p { font-size: 0.85rem; color: var(--text-muted); }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .form-group { margin-bottom: 0; }
    .form-group label {
      display: flex; align-items: center; gap: 6px;
      font-size: 0.85rem; font-weight: 600;
      color: var(--text-secondary); margin-bottom: 7px;
    }
    .label-hint { font-size: 0.75rem; font-weight: 400; color: var(--text-muted); }
    .field-wrap { position: relative; }
    .field-icon {
      position: absolute; right: 12px; top: 50%;
      transform: translateY(-50%); font-size: 1.1rem; pointer-events: none;
    }
    .error-icon { color: var(--danger); }
    .has-error .form-control { border-color: var(--danger); }
    .is-valid .form-control { border-color: #4ECB71; }
    .field-error-msg {
      color: var(--danger); font-size: 0.78rem; margin-top: 5px;
      animation: slideDown 0.2s ease;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Toggle row */
    .toggle-row { display: flex; gap: 10px; }
    .tog-btn {
      flex: 1;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 10px 12px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-size: 0.85rem; font-weight: 600;
      cursor: pointer; transition: all 0.22s ease;
      font-family: 'Inter', sans-serif;
    }
    .tog-btn .material-icons { font-size: 1rem; }
    .tog-btn:hover { border-color: var(--primary-light); color: var(--primary); }
    .tog-btn.active { border-color: var(--primary); background: rgba(108,99,255,0.08); color: var(--primary); }

    /* Fitness block */
    .fitness-block {
      border: 1.5px solid var(--primary);
      border-radius: var(--radius-md);
      padding: 24px;
      margin-bottom: 24px;
      background: rgba(108,99,255,0.03);
    }
    .fitness-block-head {
      display: flex; align-items: flex-start; gap: 12px;
      margin-bottom: 20px;
    }
    .fitness-block-head .material-icons { color: var(--primary); font-size: 1.4rem; margin-top: 2px; }
    .fitness-block-head h4 { font-size: 0.95rem; font-weight: 700; color: var(--primary); margin-bottom: 3px; }
    .fitness-block-head p { font-size: 0.8rem; color: var(--text-muted); }
    .fitness-fields { display: flex; flex-direction: column; gap: 20px; }

    /* Level row */
    .level-row { display: flex; gap: 10px; }
    .lev-btn {
      flex: 1;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 14px 10px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-size: 0.82rem; font-weight: 600;
      cursor: pointer; transition: all 0.22s ease;
      font-family: 'Inter', sans-serif;
    }
    .lev-btn .material-icons { font-size: 1.4rem; }
    .lev-btn:hover { border-color: var(--primary-light); color: var(--primary); }
    .lev-btn.active { border-color: var(--primary); background: rgba(108,99,255,0.08); color: var(--primary); }

    /* Goal row */
    .goal-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
    .goal-opt {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 14px 8px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-size: 0.78rem; font-weight: 600; text-align: center;
      cursor: pointer; transition: all 0.22s ease;
      font-family: 'Inter', sans-serif;
    }
    .goal-opt .material-icons { font-size: 1.3rem; }
    .goal-opt:hover { border-color: var(--secondary); color: var(--secondary); }
    .goal-opt.active { border-color: var(--secondary); background: rgba(0,201,167,0.08); color: var(--secondary); }

    /* Error / Success */
    .error-msg {
      display: flex; align-items: center; gap: 8px;
      background: rgba(255,71,87,0.08);
      border: 1px solid rgba(255,71,87,0.25);
      color: var(--danger);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      margin-bottom: 16px;
      font-size: 0.88rem; font-weight: 500;
    }
    .success-msg {
      display: flex; align-items: center; gap: 8px;
      background: rgba(78,203,113,0.08);
      border: 1px solid rgba(78,203,113,0.25);
      color: var(--success);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      margin-bottom: 16px;
      font-size: 0.88rem; font-weight: 500;
    }
    .error-msg .material-icons, .success-msg .material-icons { font-size: 1.1rem; }

    /* Save button */
    .form-actions { display: flex; }
    .btn-save {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 36px;
      background: linear-gradient(135deg, #6C63FF 0%, #00C9A7 100%);
      color: white; border: none; border-radius: var(--radius-md);
      font-size: 0.95rem; font-weight: 700; cursor: pointer;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 4px 15px rgba(108,99,255,0.35);
      transition: all 0.3s ease;
    }
    .btn-save .material-icons { font-size: 1.1rem; }
    .btn-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(108,99,255,0.45); }
    .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
    .saving-state { display: flex; align-items: center; gap: 10px; }
    .sring {
      width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.35);
      border-top-color: white; border-radius: 50%;
      animation: spin 0.7s linear infinite; display: inline-block;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Loading */
    .profile-loading { text-align: center; padding: 80px 24px; color: var(--text-muted); }
    .loader {
      width: 40px; height: 40px; border: 3px solid var(--border-color);
      border-top-color: var(--primary); border-radius: 50%;
      animation: spin 0.8s linear infinite; margin: 0 auto 16px;
    }

    @media (max-width: 768px) {
      .profile-hero { flex-direction: column; padding: 28px 24px; }
      .hero-stats { flex-wrap: wrap; gap: 8px; }
      .hstat { padding: 0 12px; }
      .form-grid { grid-template-columns: 1fr; }
      .goal-row { grid-template-columns: 1fr 1fr; }
      .level-row { flex-direction: column; }
      .edit-section { padding: 24px 20px; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: any;
  saving = false;
  saveMsg = '';
  profileError = '';
  phoneErr = '';

  goalOptions = [
    { value: 'OVERALL_HEALTH',      label: 'Overall Health',  icon: 'favorite' },
    { value: 'MUSCULAR_STRENGTH',   label: 'Build Muscle',    icon: 'fitness_center' },
    { value: 'WEIGHT_LOSS',         label: 'Lose Weight',     icon: 'trending_down' },
    { value: 'DIABETIC_BP_CONTROL', label: 'Diabetic/BP',     icon: 'health_and_safety' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProfile().subscribe(res => this.profile = res);
  }

  levelLabel(): string {
    const m: Record<string, string> = {
      BEGINNER: 'Beginner', INTERMEDIATE: 'Intermediate', HARD: 'Advanced'
    };
    return m[this.profile?.workoutLevel] || this.profile?.workoutLevel || '';
  }

  levelClass(): string {
    const m: Record<string, string> = {
      BEGINNER: 'lv-beginner', INTERMEDIATE: 'lv-intermediate', HARD: 'lv-hard'
    };
    return m[this.profile?.workoutLevel] || '';
  }

  levelIcon(): string {
    const m: Record<string, string> = {
      BEGINNER: 'directions_walk', INTERMEDIATE: 'directions_run', HARD: 'sports_martial_arts'
    };
    return m[this.profile?.workoutLevel] || 'fitness_center';
  }

  goalLabel(): string {
    const m: Record<string, string> = {
      OVERALL_HEALTH: 'Overall Health', MUSCULAR_STRENGTH: 'Build Muscle',
      WEIGHT_LOSS: 'Lose Weight', DIABETIC_BP_CONTROL: 'Diabetic/BP'
    };
    return m[this.profile?.goal] || this.profile?.goal || '';
  }

  goalIcon(): string {
    const m: Record<string, string> = {
      OVERALL_HEALTH: 'favorite', MUSCULAR_STRENGTH: 'fitness_center',
      WEIGHT_LOSS: 'trending_down', DIABETIC_BP_CONTROL: 'health_and_safety'
    };
    return m[this.profile?.goal] || 'flag';
  }

  validatePhone() {
    this.phoneErr = '';
    if (this.profile.phone && !/^\d{10}$/.test(this.profile.phone)) {
      this.phoneErr = 'Enter 10 digits only (no spaces or symbols)';
    }
  }

  saveProfile() {
    this.profileError = '';
    this.validatePhone();
    if (this.phoneErr) return;

    this.saving = true;
    this.saveMsg = '';
    this.api.updateProfile(this.profile).subscribe({
      next: (res) => {
        this.profile = res;
        this.saving = false;
        this.saveMsg = 'Profile saved! Your dashboard plans now reflect your updated settings.';
        setTimeout(() => this.saveMsg = '', 5000);
      },
      error: (err) => {
        this.saving = false;
        this.profileError = err.error?.message || err.error?.error || 'Failed to save. Please check your inputs.';
      }
    });
  }
}
