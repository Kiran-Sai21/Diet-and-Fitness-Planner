import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <div class="page-header animate-fade-in">
        <span class="material-icons" style="color: var(--primary); font-size: 2rem">admin_panel_settings</span>
        <h1>Admin Panel</h1>
        <p>Manage users, meal plans, and workout plans</p>
      </div>

      <!-- Tabs -->
      <div class="admin-tabs">
        <button class="tab-btn" [class.active]="activeTab === 'users'" (click)="activeTab = 'users'">
          <span class="material-icons">people</span> Users
        </button>
        <button class="tab-btn" [class.active]="activeTab === 'meals'" (click)="activeTab = 'meals'; loadMeals()">
          <span class="material-icons">restaurant</span> Meal Plans
        </button>
        <button class="tab-btn" [class.active]="activeTab === 'workouts'" (click)="activeTab = 'workouts'; loadWorkouts()">
          <span class="material-icons">fitness_center</span> Workouts
        </button>
      </div>

      <!-- Users Tab -->
      <div *ngIf="activeTab === 'users'" class="tab-content">
        <div class="table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Workout Level</th>
                <th>Goal</th>
                <th>Points</th>
                <th>Streak</th>
                <th>Badge</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let u of users">
                <td class="user-name">{{ u.name }}</td>
                <td>{{ u.username }}</td>
                <td><span class="badge badge-info">{{ u.workoutLevel }}</span></td>
                <td>{{ formatGoal(u.goal) }}</td>
                <td class="points-col">{{ u.rewardPoints }}</td>
                <td>{{ u.streakCount }}</td>
                <td><span class="badge badge-success">{{ u.badge }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Meals Tab -->
      <div *ngIf="activeTab === 'meals'" class="tab-content">
        <button class="btn btn-primary btn-sm" (click)="showMealForm = !showMealForm" style="margin-bottom: 20px">
          <span class="material-icons">add</span> {{ showMealForm ? 'Cancel' : 'Add Meal Plan' }}
        </button>

        <div class="form-card card" *ngIf="showMealForm">
          <div class="form-grid">
            <div class="form-group">
              <label>Meal Type</label>
              <select class="form-control" [(ngModel)]="mealForm.mealType" name="mealType">
                <option value="BREAKFAST">Breakfast</option>
                <option value="LUNCH">Lunch</option>
                <option value="SNACK">Snack</option>
                <option value="DINNER">Dinner</option>
              </select>
            </div>
            <div class="form-group">
              <label>Food Item</label>
              <input class="form-control" [(ngModel)]="mealForm.foodItem" name="foodItem" placeholder="e.g. Grilled Chicken Salad">
            </div>
            <div class="form-group">
              <label>Calories</label>
              <input type="number" class="form-control" [(ngModel)]="mealForm.calories" name="calories">
            </div>
            <div class="form-group">
              <label>Proteins (g)</label>
              <input type="number" class="form-control" [(ngModel)]="mealForm.proteins" name="proteins">
            </div>
            <div class="form-group">
              <label>Carbs (g)</label>
              <input type="number" class="form-control" [(ngModel)]="mealForm.carbs" name="carbs">
            </div>
            <div class="form-group">
              <label>Fats (g)</label>
              <input type="number" class="form-control" [(ngModel)]="mealForm.fats" name="fats">
            </div>
            <div class="form-group">
              <label>Diet Preference</label>
              <select class="form-control" [(ngModel)]="mealForm.dietPreference" name="dietPref">
                <option value="VEG">Veg</option>
                <option value="NON_VEG">Non-Veg</option>
              </select>
            </div>
            <div class="form-group">
              <label>Goal</label>
              <select class="form-control" [(ngModel)]="mealForm.goal" name="mealGoal">
                <option value="OVERALL_HEALTH">Overall Health</option>
                <option value="MUSCULAR_STRENGTH">Muscular Strength</option>
                <option value="WEIGHT_LOSS">Weight Loss</option>
                <option value="DIABETIC_BP_CONTROL">Diabetic/BP Control</option>
              </select>
            </div>
            <div class="form-group">
              <label>Day Number</label>
              <input type="number" class="form-control" [(ngModel)]="mealForm.dayNumber" name="dayNum">
            </div>
          </div>
          <button class="btn btn-success btn-sm" (click)="saveMeal()">
            <span class="material-icons">save</span> Save
          </button>
        </div>

        <div class="table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Food Item</th>
                <th>Calories</th>
                <th>Diet</th>
                <th>Goal</th>
                <th>Day</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of meals">
                <td><span class="badge badge-primary">{{ m.mealType }}</span></td>
                <td>{{ m.foodItem }}</td>
                <td>{{ m.calories }}</td>
                <td>{{ m.dietPreference }}</td>
                <td>{{ formatGoal(m.goal) }}</td>
                <td>{{ m.dayNumber }}</td>
                <td>
                  <button class="btn-icon edit" (click)="editMeal(m)" title="Edit">
                    <span class="material-icons">edit</span>
                  </button>
                  <button class="btn-icon delete" (click)="deleteMeal(m.id)" title="Delete">
                    <span class="material-icons">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Workouts Tab -->
      <div *ngIf="activeTab === 'workouts'" class="tab-content">
        <button class="btn btn-primary btn-sm" (click)="showWorkoutForm = !showWorkoutForm" style="margin-bottom: 20px">
          <span class="material-icons">add</span> {{ showWorkoutForm ? 'Cancel' : 'Add Workout' }}
        </button>

        <div class="form-card card" *ngIf="showWorkoutForm">
          <div class="form-grid">
            <div class="form-group">
              <label>Exercise Name</label>
              <input class="form-control" [(ngModel)]="workoutForm.exerciseName" name="exName" placeholder="e.g. Push-ups">
            </div>
            <div class="form-group">
              <label>Reps</label>
              <input class="form-control" [(ngModel)]="workoutForm.reps" name="reps" placeholder="e.g. 15">
            </div>
            <div class="form-group">
              <label>Sets</label>
              <input type="number" class="form-control" [(ngModel)]="workoutForm.sets" name="sets">
            </div>
            <div class="form-group">
              <label>Category</label>
              <input class="form-control" [(ngModel)]="workoutForm.category" name="cat" placeholder="e.g. Upper Body">
            </div>
            <div class="form-group">
              <label>Workout Level</label>
              <select class="form-control" [(ngModel)]="workoutForm.workoutLevel" name="wLevel">
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div class="form-group">
              <label>Goal</label>
              <select class="form-control" [(ngModel)]="workoutForm.goal" name="wGoal">
                <option value="OVERALL_HEALTH">Overall Health</option>
                <option value="MUSCULAR_STRENGTH">Muscular Strength</option>
                <option value="WEIGHT_LOSS">Weight Loss</option>
                <option value="DIABETIC_BP_CONTROL">Diabetic/BP Control</option>
              </select>
            </div>
            <div class="form-group">
              <label>Day Number</label>
              <input type="number" class="form-control" [(ngModel)]="workoutForm.dayNumber" name="wDay">
            </div>
          </div>
          <button class="btn btn-success btn-sm" (click)="saveWorkout()">
            <span class="material-icons">save</span> Save
          </button>
        </div>

        <div class="table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Category</th>
                <th>Level</th>
                <th>Goal</th>
                <th>Day</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let w of workouts">
                <td>{{ w.exerciseName }}</td>
                <td>{{ w.reps }}</td>
                <td>{{ w.sets }}</td>
                <td>{{ w.category }}</td>
                <td><span class="badge badge-info">{{ w.workoutLevel }}</span></td>
                <td>{{ formatGoal(w.goal) }}</td>
                <td>{{ w.dayNumber }}</td>
                <td>
                  <button class="btn-icon edit" (click)="editWorkout(w)" title="Edit">
                    <span class="material-icons">edit</span>
                  </button>
                  <button class="btn-icon delete" (click)="deleteWorkout(w.id)" title="Delete">
                    <span class="material-icons">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }
    .page-header { text-align: center; margin-bottom: 32px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; margin: 8px 0; }
    .page-header p { color: var(--text-secondary); }

    .admin-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 32px;
      border-bottom: 2px solid var(--border-color);
      padding-bottom: 0;
    }
    .tab-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: none;
      border: none;
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
    }
    .tab-btn:hover { color: var(--primary); }
    .tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }

    .table-wrapper {
      overflow-x: auto;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    .admin-table th {
      background: var(--bg-primary);
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .admin-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border-color);
    }
    .admin-table tr:hover td { background: rgba(108,99,255,0.03); }
    .user-name { font-weight: 600; }
    .points-col { font-weight: 700; color: var(--primary); }

    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: var(--radius-sm);
      transition: all 0.2s;
    }
    .btn-icon .material-icons { font-size: 1.1rem; }
    .btn-icon.edit { color: var(--primary); }
    .btn-icon.edit:hover { background: rgba(108,99,255,0.1); }
    .btn-icon.delete { color: var(--danger); }
    .btn-icon.delete:hover { background: rgba(255,71,87,0.1); }

    .form-card { margin-bottom: 24px; }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
      margin-bottom: 16px;
    }

    @media (max-width: 768px) {
      .admin-tabs { flex-wrap: wrap; }
    }
  `]
})
export class AdminComponent implements OnInit {
  activeTab = 'users';
  users: any[] = [];
  meals: any[] = [];
  workouts: any[] = [];
  showMealForm = false;
  showWorkoutForm = false;

  mealForm: any = { mealType: 'BREAKFAST', foodItem: '', calories: 0, proteins: 0, carbs: 0, fats: 0, dietPreference: 'VEG', goal: 'OVERALL_HEALTH', dayNumber: 1 };
  workoutForm: any = { exerciseName: '', reps: '', sets: 3, category: '', workoutLevel: 'BEGINNER', goal: 'OVERALL_HEALTH', dayNumber: 1 };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUsers().subscribe(res => this.users = res);
  }

  loadMeals() { this.api.getMealPlans().subscribe(res => this.meals = res); }
  loadWorkouts() { this.api.getWorkoutPlans().subscribe(res => this.workouts = res); }

  saveMeal() {
    this.api.saveMealPlan(this.mealForm).subscribe(() => {
      this.loadMeals();
      this.showMealForm = false;
      this.mealForm = { mealType: 'BREAKFAST', foodItem: '', calories: 0, proteins: 0, carbs: 0, fats: 0, dietPreference: 'VEG', goal: 'OVERALL_HEALTH', dayNumber: 1 };
    });
  }

  editMeal(m: any) {
    this.mealForm = { ...m };
    this.showMealForm = true;
  }

  deleteMeal(id: number) {
    if (confirm('Delete this meal plan?')) {
      this.api.deleteMealPlan(id).subscribe(() => this.loadMeals());
    }
  }

  saveWorkout() {
    this.api.saveWorkoutPlan(this.workoutForm).subscribe(() => {
      this.loadWorkouts();
      this.showWorkoutForm = false;
      this.workoutForm = { exerciseName: '', reps: '', sets: 3, category: '', workoutLevel: 'BEGINNER', goal: 'OVERALL_HEALTH', dayNumber: 1 };
    });
  }

  editWorkout(w: any) {
    this.workoutForm = { ...w };
    this.showWorkoutForm = true;
  }

  deleteWorkout(id: number) {
    if (confirm('Delete this workout plan?')) {
      this.api.deleteWorkoutPlan(id).subscribe(() => this.loadWorkouts());
    }
  }

  formatGoal(goal: string): string {
    return goal?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '';
  }
}
