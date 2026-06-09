import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://diet-and-fitness-planner.onrender.com/api';

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/dashboard`);
  }

  // Complete task
  completeTask(taskId: number, taskType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/complete-task`, { taskId, taskType });
  }

  // History
  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/history`);
  }

  // Profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/profile`, data);
  }

  // Admin
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/users`);
  }

  getMealPlans(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/meals`);
  }

  saveMealPlan(data: any): Observable<any> {
    if (data.id) {
      return this.http.put(`${this.apiUrl}/admin/meals/${data.id}`, data);
    }
    return this.http.post(`${this.apiUrl}/admin/meals`, data);
  }

  deleteMealPlan(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/meals/${id}`);
  }

  getWorkoutPlans(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/workouts`);
  }

  saveWorkoutPlan(data: any): Observable<any> {
    if (data.id) {
      return this.http.put(`${this.apiUrl}/admin/workouts/${data.id}`, data);
    }
    return this.http.post(`${this.apiUrl}/admin/workouts`, data);
  }

  deleteWorkoutPlan(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/workouts/${id}`);
  }
}
