import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="landing">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg">
          <div class="hero-shape shape-1"></div>
          <div class="hero-shape shape-2"></div>
          <div class="hero-shape shape-3"></div>
        </div>
        <div class="hero-content animate-fade-in">
          <span class="hero-badge">🚀 Your Fitness Journey Starts Here</span>
          <h1>Transform Your <span class="gradient-text">Health</span> & <span class="gradient-text">Fitness</span></h1>
          <p class="hero-subtitle">Personalized diet plans, smart workout routines, BMI tracking, and a gamified reward system — all in one powerful platform.</p>
          <div class="hero-actions">
            <a routerLink="/register" class="btn btn-primary btn-lg">
              <span class="material-icons">rocket_launch</span> Get Started Free
            </a>
            <a routerLink="/login" class="btn btn-secondary btn-lg">
              <span class="material-icons">login</span> Login
            </a>
          </div>
       
        </div>
      </section>

      <!-- Quote Section -->
      <section class="quote-section">
        <div class="quote-card">
          <span class="quote-icon">"</span>
          <p class="quote-text">{{ currentQuote }}</p>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="section-header">
          <span class="section-badge">Features</span>
          <h2>Everything You Need to <span class="gradient-text">Stay Fit</span></h2>
          <p>Comprehensive tools designed to help you achieve your health and fitness goals</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" *ngFor="let feature of features; let i = index"
               [style.animation-delay]="i * 0.1 + 's'">
            <div class="feature-icon" [style.background]="feature.gradient">
              <span class="material-icons">{{ feature.icon }}</span>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="how-it-works">
        <div class="section-header">
          <span class="section-badge">How It Works</span>
          <h2>Start in <span class="gradient-text">3 Simple Steps</span></h2>
        </div>
        <div class="steps-grid">
          <div class="step-card" *ngFor="let step of steps; let i = index">
            <div class="step-number">{{ i + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-card">
          <h2>Ready to Transform Your Life?</h2>
          <p>Join thousands of users who have already started their fitness journey with us.</p>
          <a routerLink="/register" class="btn btn-primary btn-lg">
            <span class="material-icons">arrow_forward</span> Start Now — It's Free
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <p>© 2026 Diet & Fitness Planner. Built with ❤️ for a healthier world.</p>
      </footer>
    </div>
  `,
  styles: [`
    .landing { overflow-x: hidden; }

    /* Hero */
    .hero {
      position: relative;
      min-height: 92vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 24px;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .hero-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.15;
    }
    .shape-1 {
      width: 600px; height: 600px;
      background: var(--primary);
      top: -200px; right: -200px;
    }
    .shape-2 {
      width: 500px; height: 500px;
      background: var(--secondary);
      bottom: -150px; left: -150px;
    }
    .shape-3 {
      width: 400px; height: 400px;
      background: var(--accent);
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    }
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
    }
    .hero-badge {
      display: inline-block;
      background: rgba(108,99,255,0.1);
      color: var(--primary);
      padding: 8px 20px;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 20px;
    }
    .gradient-text {
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-subtitle {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-bottom: 36px;
      line-height: 1.7;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 48px;
    }
    .hero-stats {
      display: flex;
      gap: 40px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .stat { text-align: center; }
    .stat-num {
      display: block;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--primary);
    }
    .stat-label {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* Quote */
    .quote-section {
      padding: 40px 24px;
      display: flex;
      justify-content: center;
    }
    .quote-card {
      max-width: 700px;
      text-align: center;
      padding: 40px;
      background: var(--bg-card);
      border-radius: var(--radius-xl);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      position: relative;
    }
    .quote-icon {
      font-size: 5rem;
      color: var(--primary);
      opacity: 0.2;
      position: absolute;
      top: -10px;
      left: 20px;
      font-family: Georgia, serif;
    }
    .quote-text {
      font-size: 1.3rem;
      font-style: italic;
      color: var(--text-secondary);
      line-height: 1.8;
    }

    /* Features */
    .features { padding: 80px 24px; }
    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }
    .section-badge {
      display: inline-block;
      background: rgba(0,201,167,0.1);
      color: var(--secondary);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 12px;
    }
    .section-header p {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .feature-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 32px;
      transition: all 0.3s ease;
      animation: fadeIn 0.6s ease-out both;
    }
    .feature-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
    }
    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .feature-icon .material-icons {
      font-size: 1.6rem;
      color: white;
    }
    .feature-card h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .feature-card p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* How It Works */
    .how-it-works { padding: 80px 24px; }
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 32px;
      max-width: 900px;
      margin: 0 auto;
    }
    .step-card {
      text-align: center;
      padding: 32px;
    }
    .step-number {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-full);
      background: var(--gradient-primary);
      color: white;
      font-size: 1.4rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    .step-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .step-card p {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    /* CTA */
    .cta-section { padding: 60px 24px; }
    .cta-card {
      max-width: 700px;
      margin: 0 auto;
      background: var(--gradient-primary);
      border-radius: var(--radius-xl);
      padding: 60px 40px;
      text-align: center;
      color: white;
    }
    .cta-card h2 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 16px;
    }
    .cta-card p {
      opacity: 0.9;
      margin-bottom: 32px;
      font-size: 1.1rem;
    }
    .cta-card .btn {
      background: white;
      color: var(--primary);
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    /* Footer */
    .footer {
      text-align: center;
      padding: 40px 24px;
      color: var(--text-muted);
      font-size: 0.9rem;
      border-top: 1px solid var(--border-color);
    }

    @media (max-width: 768px) {
      .hero-content h1 { font-size: 2.2rem; }
      .hero-stats { gap: 24px; }
      .section-header h2 { font-size: 1.8rem; }
    }
  `]
})
export class LandingComponent implements OnInit, OnDestroy {
  currentQuote = '';
  private quoteInterval: any;

  quotes = [
    "The only bad workout is the one that didn't happen.",
    "Take care of your body. It's the only place you have to live.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "A healthy outside starts from the inside.",
    "Strive for progress, not perfection.",
    "Your health is an investment, not an expense.",
    "Small daily improvements are the key to staggering long-term results.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't stop until you're proud."
  ];

  features = [
    { icon: 'restaurant', title: 'Personalized Diet Plans', description: 'Get custom meal plans based on your dietary preference, health goals, and nutritional needs.', gradient: 'linear-gradient(135deg, #6C63FF, #8B83FF)' },
    { icon: 'fitness_center', title: 'Smart Workout Plans', description: 'Level-appropriate exercise routines tailored to your fitness goals — from beginner to advanced.', gradient: 'linear-gradient(135deg, #00C9A7, #33D4B8)' },
    { icon: 'monitor_weight', title: 'BMI Tracking', description: 'Track your Body Mass Index with gender-specific calculations and see your progress over time.', gradient: 'linear-gradient(135deg, #FF6B6B, #FF8A8A)' },
    { icon: 'emoji_events', title: 'Reward & Streak System', description: 'Stay motivated with daily streaks, reward points, and achievement badges as you complete tasks.', gradient: 'linear-gradient(135deg, #FFB84D, #FFD180)' },
    { icon: 'trending_up', title: 'Progress Tracking', description: 'Monitor your daily progress with interactive checklists and detailed history logs.', gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)' },
    { icon: 'tips_and_updates', title: 'Wellness Tips', description: 'Get personalized water intake, sleep, and health recommendations based on your profile.', gradient: 'linear-gradient(135deg, #A855F7, #C084FC)' }
  ];

  steps = [
    { title: 'Create Your Profile', desc: 'Sign up and tell us about your goals, diet preference, and fitness level.' },
    { title: 'Get Your Plans', desc: 'Receive personalized meal and workout plans tailored just for you.' },
    { title: 'Track & Earn', desc: 'Complete daily tasks, build streaks, and earn badges on your fitness journey.' }
  ];

  ngOnInit() {
    this.currentQuote = this.quotes[0];
    this.quoteInterval = setInterval(() => {
      this.currentQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.quoteInterval);
  }
}
