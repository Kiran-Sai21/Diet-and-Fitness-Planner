import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-page">
      <div class="page-header animate-fade-in">
        <span class="material-icons" style="color: var(--primary); font-size: 2rem">history</span>
        <h1>Progress History</h1>
        <p>Your last 10 days of fitness activity</p>
      </div>

      <div class="history-list" *ngIf="history.length > 0">
        <div class="history-card card" *ngFor="let h of history; let i = index"
             [style.animation-delay]="i * 0.05 + 's'">
          <div class="history-date">
            <span class="material-icons">calendar_today</span>
            {{ h.date }}
          </div>
          <div class="history-details">
            <div class="history-stat">
              <div class="stat-circle" [class.done]="h.allDone">
                <span class="material-icons">{{ h.allDone ? 'check_circle' : 'radio_button_unchecked' }}</span>
              </div>
              <span>{{ h.allDone ? 'All Completed' : 'Incomplete' }}</span>
            </div>
            <div class="history-stat">
              <span class="material-icons" style="color: var(--secondary)">restaurant</span>
              <span>{{ h.completedMealIds?.length || 0 }} meals</span>
            </div>
            <div class="history-stat">
              <span class="material-icons" style="color: var(--accent)">fitness_center</span>
              <span>{{ h.completedWorkoutIds?.length || 0 }} workouts</span>
            </div>
            <div class="history-stat points">
              <span class="material-icons">stars</span>
              +{{ h.pointsEarned }} pts
            </div>
            <div class="history-stat streak">
              <span class="material-icons">local_fire_department</span>
              {{ h.currentStreak }} streak
            </div>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="history.length === 0 && loaded">
        <span class="material-icons" style="font-size: 4rem; color: var(--text-muted)">inbox</span>
        <h3>No History Yet</h3>
        <p>Start completing tasks to build your history!</p>
      </div>
    </div>
  `,
  styles: [`
    .history-page { max-width: 800px; margin: 0 auto; padding: 32px 24px; }
    .page-header { text-align: center; margin-bottom: 40px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; margin: 8px 0; }
    .page-header p { color: var(--text-secondary); }
    .history-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 12px;
      animation: fadeIn 0.4s ease-out both;
    }
    .history-date {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      min-width: 140px;
    }
    .history-date .material-icons { color: var(--primary); font-size: 1.1rem; }
    .history-details {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      align-items: center;
    }
    .history-stat {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.88rem;
      font-weight: 500;
    }
    .history-stat .material-icons { font-size: 1.1rem; }
    .stat-circle .material-icons { font-size: 1.3rem; color: var(--text-muted); }
    .stat-circle.done .material-icons { color: var(--success); }
    .history-stat.points { color: var(--warning); }
    .history-stat.streak { color: var(--accent); }
    .empty-state {
      text-align: center;
      padding: 60px 24px;
    }
    .empty-state h3 { margin: 12px 0 8px; }
    .empty-state p { color: var(--text-secondary); }
  `]
})
export class HistoryComponent implements OnInit {
  history: any[] = [];
  loaded = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getHistory().subscribe({
      next: (res) => { this.history = res; this.loaded = true; },
      error: () => { this.loaded = true; }
    });
  }
}
