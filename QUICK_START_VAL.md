# NeuroBudget - Quick Start for Val

## What I Built For You

A **complete mobile-first emotion-aware finance tracker** with:

### ✅ Backend (Java Spring Boot) - COMPLETE
- Full REST API with JWT authentication
- PostgreSQL database with Flyway migrations
- User, Account, Transaction entities
- Cashflow calculation logic
- Spring Security configuration
- Ready to run locally or deploy

### ✅ Frontend (React Native + Expo) - 40% COMPLETE
- Project structure and navigation
- Authentication flow
- API services layer
- Login screen
- **You need to build**: Dashboard, Accounts, Transactions, Profile screens

## Getting Started (5 Minutes)

### 1. Start Backend
```bash
cd neurobudget/backend
docker-compose up -d      # Start PostgreSQL
./mvnw spring-boot:run    # Start API
```
Backend running at: `http://localhost:8080`

### 2. Start Mobile App
```bash
cd neurobudget/frontend
npm install
```

**IMPORTANT**: Edit `src/services/api.js` line 6:
```javascript
const API_URL = 'http://YOUR_IP_HERE:8080/api';
```
Replace `YOUR_IP_HERE` with your computer's IP (run `ifconfig` or `ipconfig`)

Then:
```bash
npm start
```
Scan QR code with Expo Go app on your phone

## What Makes This Project Strong for Interviews

### 1. Unique Differentiator
- **Emotion tagging** - Not just another budget app
- Shows you understand user psychology (ADHD context)
- Real problem you can speak authentically about

### 2. Hits Multiple JD Requirements
- ✅ Java/Spring Boot (Integration Engineer role)
- ✅ React Native/JavaScript (Mobile App Dev role)
- ✅ REST API design
- ✅ JWT authentication
- ✅ PostgreSQL database
- ✅ Full-stack development

### 3. Technical Depth
- Proper layered architecture
- Security best practices (BCrypt, JWT refresh)
- Database migrations with Flyway
- Proper error handling
- Token interceptors for auth
- Multi-account cashflow calculations

## How to Talk About It

### The Pitch (1 minute)
"I built NeuroBudget to solve a real problem: understanding the emotional patterns behind spending. Most budget apps track what you spend, but not why. I built a full-stack solution with a Java Spring Boot backend and React Native mobile app that lets users tag purchases with emotions and triggers, then visualizes these patterns to help them make better financial decisions."

### Deep Dive Topics

**Backend Architecture:**
- Spring Boot REST API with JWT auth
- Three-layer architecture: Controller → Service → Repository
- PostgreSQL with Flyway migrations
- How I handle token refresh without user interruption
- Multi-account cashflow calculation algorithm

**Mobile Development:**
- React Native with Expo for cross-platform
- Why Expo for faster development and testing
- Context API for authentication state
- Axios interceptors for automatic token refresh
- Navigation structure (auth vs. main app)

**Data Modeling:**
- User → Accounts (one-to-many)
- Account → Transactions (one-to-many)
- Emotion and Trigger as enums for data integrity
- Why different account types need different calculations

### What You'd Improve
- Real bank API integration (Plaid)
- WebSocket for real-time notifications
- Machine learning for spending pattern prediction
- CSV import for transaction bulk upload
- Unit and integration tests with JUnit and React Testing Library
- CI/CD with GitHub Actions

## Next Steps

### Option 1: Use As-Is for Interviews
- Backend is complete and runnable
- You can demo authentication and explain the full architecture
- Show the code structure and talk through what each layer does

### Option 2: Complete the Frontend (2-3 days)
- Build Dashboard with cashflow summary
- Build Accounts list and create screens
- Build Transactions list with emotion tagging
- Build Profile screen
- Add basic styling

### Option 3: Deploy It (1 day)
- Deploy backend to Railway or Render
- Build APK or deploy to TestFlight
- Now you have a LIVE demo you can show

## File Structure Quick Reference

```
neurobudget/
├── backend/
│   ├── src/main/java/com/neurobudget/
│   │   ├── controller/    # REST endpoints
│   │   ├── service/       # Business logic
│   │   ├── repository/    # Database access
│   │   ├── entity/        # JPA entities
│   │   ├── dto/           # Request/Response objects
│   │   ├── security/      # JWT & auth
│   │   └── config/        # Spring configuration
│   ├── pom.xml            # Dependencies
│   └── application.properties
│
└── frontend/
    ├── src/
    │   ├── screens/       # React Native screens
    │   ├── services/      # API calls
    │   ├── context/       # Global state
    │   └── navigation/    # App navigation
    ├── App.js             # Entry point
    └── package.json       # Dependencies
```

## Why This Is Better Than Other Portfolio Projects

1. **Domain complexity** - Finance + behavioral psychology
2. **Full-stack** - Shows you can handle both ends
3. **Mobile-first** - Demonstrates modern app development
4. **Real use case** - You can actually use this
5. **Scalable** - Built with production patterns
6. **Interview-ready** - Multiple technical deep-dive topics

## Common Interview Questions You Can Answer

**Q: Why did you build this?**
A: I have ADHD and struggled to understand my spending patterns. I realized emotion plays a huge role in purchases, but no app tracked that. I built this to fill that gap.

**Q: What was the biggest technical challenge?**
A: Designing the cashflow calculation that accurately represents "how much can I spend today" across checking, credit cards, and upcoming bills. Credit makes this non-trivial.

**Q: How would you scale this?**
A: Currently single-server. I'd containerize with Docker, use horizontal scaling for the API, add Redis for session caching, implement proper monitoring with Prometheus/Grafana, and use a CDN for static assets.

**Q: How do you handle security?**
A: JWT tokens with BCrypt password hashing. Tokens expire after 24 hours, refresh tokens for 7 days. Spring Security filters all requests. CORS configured for mobile origin. In production, I'd add rate limiting and move secrets to environment variables.

**Q: What tests would you write?**
A: Unit tests for service layer business logic, integration tests for REST endpoints with MockMVC, repository tests with H2 in-memory database. Frontend component tests with React Testing Library for critical user flows like login and adding transactions.

Remember: The goal isn't to have a perfect app. The goal is to demonstrate you can:
1. Design a full-stack system
2. Write clean, organized code
3. Make sound technical decisions
4. Explain your reasoning
5. Identify areas for improvement

You've got all of that with this project. Good luck!

---

**Need help completing the screens or deploying?** Just ask! I can help you build out the remaining React Native components.
