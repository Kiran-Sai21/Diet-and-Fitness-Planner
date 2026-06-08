import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard" *ngIf="data">
      <!-- Top Bar -->
      <div class="dash-top">
        <div class="greeting">
          <h1>Hello, <span class="gradient-text">{{ data.profile.name }}</span> 👋</h1>
          <p class="quote-line">💡 {{ data.quote }}</p>
        </div>
        <div class="top-badges">
          <div class="streak-badge">
            <span class="material-icons">local_fire_department</span>
            <span>{{ data.todayProgress.currentStreak }} Day Streak</span>
          </div>
          <div class="points-badge">
            <span class="material-icons">stars</span>
            <span>{{ data.todayProgress.totalPoints }} Points</span>
          </div>
          <div class="badge-pill" [ngClass]="getBadgeClass(data.todayProgress.badge)">
            <span class="material-icons">emoji_events</span>
            {{ data.todayProgress.badge }}
          </div>
        </div>
      </div>

      <!-- BMI & Wellness Row -->
      <div class="info-row">
        <div class="bmi-card card">
          <div class="bmi-header">
            <span class="material-icons">monitor_weight</span>
            <h3>Your BMI</h3>
          </div>
          <div class="bmi-value">{{ data.profile.bmi }}</div>
          <div class="bmi-status" [ngClass]="getBmiClass(data.profile.bmi)">
            {{ getBmiLabel(data.profile.bmi) }}
          </div>
          <div class="bmi-bar">
            <div class="bmi-fill" [style.width]="getBmiPercent(data.profile.bmi) + '%'"
                 [ngClass]="getBmiClass(data.profile.bmi)"></div>
          </div>
          <div class="bmi-meta">
            <span>{{ data.profile.heightCm }} cm</span>
            <span>{{ data.profile.weightKg }} kg</span>
            <span>{{ data.profile.gender }}</span>
          </div>
        </div>

        <div class="wellness-card card">
          <h3><span class="material-icons">tips_and_updates</span> Wellness Tips</h3>
          <div class="wellness-items">
            <div class="wellness-item">
              <div class="wellness-icon water"><span class="material-icons">water_drop</span></div>
              <div>
                <div class="wellness-label">Daily Water Intake</div>
                <div class="wellness-value">{{ data.wellnessTips.waterIntake }}</div>
              </div>
            </div>
            <div class="wellness-item">
              <div class="wellness-icon sleep"><span class="material-icons">bedtime</span></div>
              <div>
                <div class="wellness-label">Sleep Recommendation</div>
                <div class="wellness-value">{{ data.wellnessTips.sleepRecommendation }}</div>
              </div>
            </div>
            <div class="wellness-item">
              <div class="wellness-icon tip"><span class="material-icons">lightbulb</span></div>
              <div>
                <div class="wellness-label">Pro Tip</div>
                <div class="wellness-value">{{ data.wellnessTips.additionalTip }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Split: Meals & Workouts -->
      <div class="main-split">
        <!-- LEFT: Meals -->
        <div class="split-section animate-slide-left">
          <div class="section-title">
            <span class="material-icons" style="color: var(--secondary)">restaurant</span>
            <h2>Today's Meal Plan</h2>
          </div>
          <div class="task-list">
            <div class="task-card" *ngFor="let meal of data.todayMeals"
                 [class.completed]="meal.completed">
              <div class="task-header">
                <div class="task-type-badge meal-badge">{{ formatMealType(meal.mealType) }}</div>
                <label class="custom-checkbox">
                  <input type="checkbox" [checked]="meal.completed" [disabled]="meal.completed"
                         (change)="completeTask(meal.id, 'meal')">
                  <span class="checkmark"></span>
                </label>
              </div>
              <h4 class="task-name">{{ meal.foodItem }}</h4>
              <div class="nutrient-row">
                <span class="nutrient cal"><span class="material-icons">local_fire_department</span> {{ meal.calories }} cal</span>
                <span class="nutrient pro"><span class="material-icons">egg</span> {{ meal.proteins }}g protein</span>
                <span class="nutrient carb"><span class="material-icons">grain</span> {{ meal.carbs }}g carbs</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Workouts -->
        <div class="split-section animate-slide-right">
          <div class="section-title">
            <span class="material-icons" style="color: var(--accent)">fitness_center</span>
            <h2>Today's Workout</h2>
          </div>
          <div class="task-list">
            <div class="task-card" *ngFor="let workout of data.todayWorkouts"
                 [class.completed]="workout.completed">
              <div class="task-header">
                <div class="task-type-badge workout-badge">{{ workout.category }}</div>
                <label class="custom-checkbox">
                  <input type="checkbox" [checked]="workout.completed" [disabled]="workout.completed"
                         (change)="completeTask(workout.id, 'workout')">
                  <span class="checkmark"></span>
                </label>
              </div>
              <h4 class="task-name">{{ workout.exerciseName }}</h4>
              <div class="workout-meta">
                <span class="rep-badge"><span class="material-icons">replay</span> {{ workout.reps }} reps</span>
                <span class="set-badge"><span class="material-icons">layers</span> {{ workout.sets }} sets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Done Celebration -->
      <div class="celebration card" *ngIf="data.todayProgress.allDone">
        <div class="celebration-content">
          <span class="celebration-emoji">🎉</span>
          <h3>All Tasks Completed!</h3>
          <p>You earned <strong>{{ data.todayProgress.pointsEarned }} points</strong> today. Keep up the amazing work!</p>
        </div>
      </div>

      <!-- Next Day Preview -->
      <div class="preview-section">
        <div class="section-title">
          <span class="material-icons" style="color: var(--info)">event</span>
          <h2>Tomorrow's Preview</h2>
        </div>
        <div class="preview-grid">
          <div class="preview-card">
            <h4><span class="material-icons">restaurant</span> Meals</h4>
            <ul>
              <li *ngFor="let m of data.tomorrowMeals">
                <span class="preview-type">{{ formatMealType(m.mealType) }}</span>
                {{ m.foodItem }}
              </li>
            </ul>
          </div>
          <div class="preview-card">
            <h4><span class="material-icons">fitness_center</span> Workouts</h4>
            <ul>
              <li *ngFor="let w of data.tomorrowWorkouts">
                {{ w.exerciseName }} — {{ w.reps }} × {{ w.sets }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div class="loading-screen" *ngIf="!data">
      <div class="loader"></div>
      <p>Loading your dashboard...</p>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1300px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    /* Top */
    .dash-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 32px;
    }
    .greeting h1 { font-size: 1.8rem; font-weight: 800; }
    .gradient-text {
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .quote-line {
      color: var(--text-secondary);
      font-size: 0.95rem;
      margin-top: 6px;
      font-style: italic;
    }
    .top-badges {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .streak-badge, .points-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .streak-badge {
      background: rgba(255,107,107,0.12);
      color: var(--accent);
    }
    .streak-badge .material-icons { color: #FF6B6B; }
    .points-badge {
      background: rgba(255,184,77,0.12);
      color: #E6A040;
    }
    .badge-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.85rem;
    }
    .badge-beginner { background: rgba(108,99,255,0.12); color: var(--primary); }
    .badge-enthusiast { background: rgba(0,201,167,0.12); color: var(--secondary); }
    .badge-pro { background: rgba(255,184,77,0.12); color: #E6A040; }
    .badge-champion { background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.2)); color: #FF8C00; }

    /* Info Row */
    .info-row {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 24px;
      margin-bottom: 32px;
    }
    .bmi-card {
      text-align: center;
    }
    .bmi-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 16px;
    }
    .bmi-header .material-icons { color: var(--primary); }
    .bmi-value {
      font-size: 3rem;
      font-weight: 800;
      color: var(--primary);
    }
    .bmi-status {
      display: inline-block;
      padding: 4px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.85rem;
      margin: 8px 0 16px;
    }
    .bmi-status.bmi-normal { background: rgba(78,203,113,0.15); color: var(--success); }
    .bmi-status.bmi-under { background: rgba(59,130,246,0.15); color: var(--info); }
    .bmi-status.bmi-over { background: rgba(255,184,77,0.15); color: #E6A040; }
    .bmi-status.bmi-obese { background: rgba(255,71,87,0.15); color: var(--danger); }
    .bmi-bar {
      height: 8px;
      background: var(--bg-primary);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .bmi-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s ease;
    }
    .bmi-fill.bmi-normal { background: var(--success); }
    .bmi-fill.bmi-under { background: var(--info); }
    .bmi-fill.bmi-over { background: var(--warning); }
    .bmi-fill.bmi-obese { background: var(--danger); }
    .bmi-meta {
      display: flex;
      justify-content: center;
      gap: 20px;
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .wellness-card h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      font-size: 1.1rem;
    }
    .wellness-card h3 .material-icons { color: var(--secondary); }
    .wellness-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .wellness-item {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .wellness-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .wellness-icon .material-icons { color: white; font-size: 1.2rem; }
    .wellness-icon.water { background: linear-gradient(135deg, #3B82F6, #60A5FA); }
    .wellness-icon.sleep { background: linear-gradient(135deg, #8B5CF6, #A78BFA); }
    .wellness-icon.tip { background: linear-gradient(135deg, #F59E0B, #FBBF24); }
    .wellness-label { font-size: 0.8rem; color: var(--text-muted); }
    .wellness-value { font-weight: 600; font-size: 0.95rem; }

    /* Main Split */
    .main-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    .section-title h2 { font-size: 1.3rem; font-weight: 700; }
    .task-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .task-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      transition: all 0.3s ease;
    }
    .task-card:hover { box-shadow: var(--shadow-md); }
    .task-card.completed {
      opacity: 0.65;
      border-left: 4px solid var(--success);
    }
    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .task-type-badge {
      padding: 3px 12px;
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .meal-badge { background: rgba(0,201,167,0.12); color: var(--secondary); }
    .workout-badge { background: rgba(255,107,107,0.12); color: var(--accent); }
    .task-name {
      font-size: 1.05rem;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .nutrient-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .nutrient {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 8px;
    }
    .nutrient .material-icons { font-size: 0.9rem; }
    .nutrient.cal { background: rgba(255,107,107,0.1); color: var(--accent); }
    .nutrient.pro { background: rgba(108,99,255,0.1); color: var(--primary); }
    .nutrient.carb { background: rgba(255,184,77,0.1); color: #E6A040; }
    .workout-meta {
      display: flex;
      gap: 12px;
    }
    .rep-badge, .set-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.85rem;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: 8px;
    }
    .rep-badge { background: rgba(108,99,255,0.1); color: var(--primary); }
    .set-badge { background: rgba(0,201,167,0.1); color: var(--secondary); }
    .rep-badge .material-icons, .set-badge .material-icons { font-size: 0.9rem; }

    /* Celebration */
    .celebration {
      background: var(--gradient-success);
      color: white;
      text-align: center;
      padding: 32px;
      margin-bottom: 32px;
      border: none;
    }
    .celebration-emoji { font-size: 3rem; }
    .celebration h3 { font-size: 1.5rem; margin: 8px 0; }

    /* Preview */
    .preview-section { margin-bottom: 40px; }
    .preview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .preview-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;
    }
    .preview-card h4 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-size: 1.05rem;
    }
    .preview-card ul {
      list-style: none;
      padding: 0;
    }
    .preview-card li {
      padding: 8px 0;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    .preview-card li:last-child { border: none; }
    .preview-type {
      display: inline-block;
      font-weight: 600;
      color: var(--primary);
      min-width: 90px;
    }

    /* Custom Checkbox */
    .custom-checkbox input[type="checkbox"] {
      width: 22px;
      height: 22px;
      accent-color: var(--success);
      cursor: pointer;
    }
    .custom-checkbox input[type="checkbox"]:disabled {
      cursor: not-allowed;
    }

    /* Loading */
    .loading-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      gap: 16px;
    }
    .loader {
      width: 48px;
      height: 48px;
      border: 4px solid var(--border-color);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 768px) {
      .dash-top { flex-direction: column; }
      .info-row, .main-split, .preview-grid { grid-template-columns: 1fr; }
      .greeting h1 { font-size: 1.4rem; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  data: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.api.getDashboard().subscribe({
      next: (res) => this.data = res,
      error: (err) => console.error('Dashboard error:', err)
    });
  }

  completeTask(taskId: number, taskType: string) {
    this.api.completeTask(taskId, taskType).subscribe({
      next: (progress) => {
        this.data.todayProgress = progress;
        // Update the task's completed status locally
        if (taskType === 'meal') {
          const meal = this.data.todayMeals.find((m: any) => m.id === taskId);
          if (meal) meal.completed = true;
        } else {
          const workout = this.data.todayWorkouts.find((w: any) => w.id === taskId);
          if (workout) workout.completed = true;
        }
      },
      error: (err) => console.error('Complete task error:', err)
    });
  }

  formatMealType(type: string): string {
    return type.charAt(0) + type.slice(1).toLowerCase();
  }

  getBmiLabel(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  getBmiClass(bmi: number): string {
    if (bmi < 18.5) return 'bmi-under';
    if (bmi < 25) return 'bmi-normal';
    if (bmi < 30) return 'bmi-over';
    return 'bmi-obese';
  }

  getBmiPercent(bmi: number): number {
    return Math.min((bmi / 40) * 100, 100);
  }

  getBadgeClass(badge: string): string {
    if (badge === 'Ultimate Fitness Champion') return 'badge-champion';
    if (badge === 'Fitness Pro') return 'badge-pro';
    if (badge === 'Health Enthusiast') return 'badge-enthusiast';
    return 'badge-beginner';
  }
}
