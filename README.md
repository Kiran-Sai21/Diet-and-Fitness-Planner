# Diet & Fitness Planner 🏋️‍♂️🥗

A full-stack production-ready web application for personalized diet plans, workout routines, BMI tracking, and a gamified reward system.

## Tech Stack
- **Frontend:** Angular 18 (Standalone Components)
- **Backend:** Spring Boot 3.2 (Java 17)
- **Database:** MySQL 8
- **Auth:** Spring Security + JWT
- **Styling:** Custom CSS with Dark/Light Mode

---

## 🏗️ Project Structure

```
Diet and Fitness Planner 12/
├── database/
│   └── schema.sql              # MySQL schema + seed data
├── backend/                    # Spring Boot application
│   ├── pom.xml
│   └── src/main/java/com/dietfitness/
│       ├── DietFitnessPlannerApplication.java
│       ├── config/SecurityConfig.java
│       ├── controller/         # REST Controllers
│       ├── dto/                # Data Transfer Objects
│       ├── entity/             # JPA Entities
│       ├── exception/          # Global Error Handler
│       ├── repository/         # Spring Data Repositories
│       ├── security/           # JWT Filter & Provider
│       └── service/            # Business Logic
└── frontend/                   # Angular 18 application
    ├── angular.json
    ├── package.json
    └── src/
        ├── index.html
        ├── main.ts
        ├── styles.css          # Global theme & styles
        └── app/
            ├── app.component.ts
            ├── app.config.ts
            ├── app.routes.ts
            ├── core/
            │   ├── guards/     # Auth & Admin Guards
            │   ├── interceptors/ # JWT Interceptor
            │   └── services/   # Auth, API, Theme Services
            ├── shared/
            │   └── navbar/     # Responsive Navbar
            └── pages/
                ├── landing/    # Landing Page
                ├── login/      # Login Page
                ├── register/   # Registration Page
                ├── dashboard/  # Main Dashboard (Meals + Workouts)
                ├── profile/    # User Profile
                ├── history/    # Progress History
                └── admin/      # Admin Panel
```

---

## 🚀 Setup Instructions

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8+

### 1. Database Setup
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend Setup
```bash
cd backend

# Update database credentials in src/main/resources/application.properties
# spring.datasource.username=root
# spring.datasource.password=root

mvn spring-boot:run
```
Backend runs at: `http://localhost:8080`

### 3. Frontend Setup
```bash
cd frontend
npm install
ng serve
```
Frontend runs at: `http://localhost:4200`

---

## 🔐 Default Admin Credentials
- **Username:** admin
- **Password:** admin123

---

## 📡 API Endpoints

### Auth APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |

### User APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/dashboard` | Get dashboard data |
| POST | `/api/user/complete-task` | Complete a task |
| GET | `/api/user/history` | Get last 10 days history |
| GET | `/api/user/profile` | Get profile |
| PUT | `/api/user/profile` | Update profile |

### Admin APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| GET/POST | `/api/admin/meals` | Get/Add meal plans |
| PUT/DELETE | `/api/admin/meals/{id}` | Update/Delete meal |
| GET/POST | `/api/admin/workouts` | Get/Add workouts |
| PUT/DELETE | `/api/admin/workouts/{id}` | Update/Delete workout |

---

## 🎮 Reward System
- **+1 point** per day completed
- **+5 bonus** every 10-day streak
- **-2 points** if streak broken

### Badges
| Points | Badge |
|--------|-------|
| 0-100 | 🌱 Beginner |
| 101-300 | 💚 Health Enthusiast |
| 301-600 | 🏆 Fitness Pro |
| 600+ | 👑 Ultimate Fitness Champion |

---

## 🎨 Features
- ✅ Responsive design (mobile-friendly)
- ✅ Dark/Light mode toggle
- ✅ JWT authentication with role-based access
- ✅ Personalized meal & workout plans
- ✅ BMI calculation (gender-specific display)
- ✅ Task completion with disable-on-click
- ✅ Streak tracking & reward points
- ✅ Progress history (last 10 days)
- ✅ Next-day preview
- ✅ Wellness tips (water, sleep, pro tips)
- ✅ Admin panel (CRUD for meals/workouts, user reports)
- ✅ Form validation & error handling

---

## 💡 Future Improvements
- AI-based diet recommendations using ML models
- Push notifications for daily reminders
- Social features (challenges, leaderboard)
- Integration with wearable devices
- Calorie calculator with barcode scanning
- Multi-language support
