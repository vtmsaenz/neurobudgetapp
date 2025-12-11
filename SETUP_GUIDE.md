# NeuroBudget - Setup & Development Guide

## 🎯 Project Overview

NeuroBudget is a mobile-first personal finance app built with:
- **Backend**: Java Spring Boot REST API with PostgreSQL
- **Frontend**: React Native mobile app with Expo
- **Features**: Multi-account tracking, emotion tagging, cashflow calculations

## 📋 Prerequisites

### Backend Requirements
- Java 17 or higher
- Maven 3.6+
- PostgreSQL 15+ (or Docker)
- Docker & Docker Compose (recommended)

### Frontend Requirements
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS/Android)

## 🚀 Quick Start

### Step 1: Start the Backend

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Start PostgreSQL with Docker**:
   ```bash
   docker-compose up -d
   ```

3. **Run the Spring Boot application**:
   ```bash
   ./mvnw clean spring-boot:run
   ```
   
   Or on Windows:
   ```bash
   mvnw.cmd clean spring-boot:run
   ```

4. **Verify backend is running**:
   - API should be available at: `http://localhost:8080`
   - Test with: `curl http://localhost:8080/api/health` (you'll need to add this endpoint)

### Step 2: Start the Mobile App

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Update API URL**:
   - Open `src/services/api.js`
   - Replace `192.168.1.100` with your computer's local IP address
   - To find your IP:
     - Mac/Linux: `ifconfig | grep inet`
     - Windows: `ipconfig`
   - Look for something like `192.168.x.x` or `10.0.x.x`

4. **Start Expo**:
   ```bash
   npm start
   ```

5. **Run on your device**:
   - Install "Expo Go" app from App Store or Google Play
   - Scan the QR code shown in terminal with your phone camera
   - App will open in Expo Go

## 📱 Testing on Your Device

### iOS
1. Open Camera app
2. Point at QR code in terminal
3. Tap notification to open in Expo Go

### Android
1. Open Expo Go app
2. Tap "Scan QR Code"
3. Point at QR code in terminal

## 🗄️ Database Setup

The application uses Flyway for database migrations. When you first run the backend:
1. PostgreSQL starts (via Docker Compose)
2. Flyway automatically creates tables
3. Database schema is in: `backend/src/main/resources/db/migration/V1__Initial_schema.sql`

### Manual Database Access

```bash
# Connect to PostgreSQL
docker exec -it neurobudget-postgres psql -U neurobudget -d neurobudget

# List tables
\dt

# View users
SELECT * FROM users;

# Exit
\q
```

## 🛠️ Development Workflow

### Backend Development

1. **Make code changes** in `backend/src/main/java/com/neurobudget/`

2. **Spring Boot will auto-reload** (if using spring-boot-devtools)

3. **Test endpoints** with cURL or Postman:
   ```bash
   # Register a user
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123",
       "firstName": "Test",
       "lastName": "User"
     }'
   
   # Login
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

### Frontend Development

1. **Make changes** in `frontend/src/`

2. **Expo will auto-reload** on your phone

3. **Shake device** to open developer menu

4. **View logs** in terminal where you ran `npm start`

## 🎨 What's Built vs. What's Left

### ✅ Backend Complete
- User authentication with JWT
- User, Account, Transaction entities
- Full CRUD REST APIs
- Spring Security configuration
- Database migrations
- Repository layer
- Service layer with business logic
- Cashflow calculation logic

### ✅ Frontend Started
- Project structure
- API service layer
- Authentication context
- Navigation setup
- Login screen

### 🚧 Frontend Needs Completion
You still need to create these screens:
- `RegisterScreen.js` - User registration
- `DashboardScreen.js` - Main dashboard with cashflow summary
- `AccountsScreen.js` - List and manage accounts
- `TransactionsScreen.js` - List transactions
- `AddTransactionScreen.js` - Add/edit transactions with emotion tagging
- `ProfileScreen.js` - User profile and settings

I can help you build these screens next!

## 📝 Interview Talking Points

### Architecture
- **RESTful API** with Spring Boot following best practices
- **JWT authentication** with token refresh mechanism
- **Layered architecture**: Controller → Service → Repository → Entity
- **React Native** for true cross-platform mobile development
- **React Context API** for state management
- **Axios interceptors** for automatic token refresh

### Key Technical Decisions

1. **Why JWT over sessions?**
   - Stateless authentication perfect for mobile apps
   - Scalable across multiple servers
   - Token stored locally on device

2. **Why React Native with Expo?**
   - Single codebase for iOS and Android
   - Expo simplifies development and deployment
   - Easy testing with Expo Go
   - Can eject to pure React Native if needed

3. **Database Design**
   - Multi-account support with different types
   - Emotion and trigger as enums for data integrity
   - Indices on common query fields
   - Soft deletes via CASCADE

4. **Security Considerations**
   - Passwords hashed with BCrypt
   - JWT tokens expire after 24 hours
   - Refresh tokens for extended sessions
   - CORS configured for mobile app origin

### What Would You Improve?

- **Real bank integration** (Plaid API)
- **WebSocket notifications** for real-time alerts
- **Background job for spending analysis** (Spring @Scheduled)
- **Unit and integration tests** (JUnit, MockMVC)
- **CI/CD pipeline** (GitHub Actions)
- **Docker containerization** for backend deployment
- **Biometric auth** on mobile
- **Offline support** with local SQLite sync

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `docker ps`
- Check port 8080 isn't in use: `lsof -i :8080` (Mac/Linux)
- View logs for errors in terminal

### Mobile app can't connect
- Ensure backend is running
- Check API_URL has correct IP address
- Ensure phone and computer on same WiFi network
- Disable firewall temporarily to test

### Database issues
- Reset database: `docker-compose down -v && docker-compose up -d`
- Check migrations ran: Look for `flyway_schema_history` table

## 📦 Building for Production

### Backend
```bash
./mvnw clean package
java -jar target/neurobudget-api-1.0.0.jar
```

### Mobile App
```bash
# Build standalone APK (Android)
eas build --platform android

# Build for App Store (iOS)
eas build --platform ios
```

## 🎓 Next Steps for Learning

1. Add comprehensive tests (JUnit, React Native Testing Library)
2. Implement CSV import functionality
3. Add data visualization charts
4. Create insights/analytics dashboard
5. Implement push notifications
6. Add biometric authentication

## Need Help?

- Backend logs: Check terminal where Spring Boot is running
- Frontend logs: Check Expo terminal and shake device for menu
- Database: Use `docker logs neurobudget-postgres`

Ready to continue building the remaining screens?
