# NeuroBudget: Emotion-Aware Cashflow Tracker

A mobile-first personal finance application that helps users understand their true cashflow across multiple accounts while tracking the emotional patterns behind their spending habits.

## 🎯 Problem It Solves

Most budgeting apps track what you spend, but not why you spend—or how credit cards, BNPL, and multiple accounts distort your sense of "how much money I actually have." NeuroBudget helps users (especially those with ADHD or emotional spending patterns) see true cashflow across multiple accounts, tag each expense with an emotional state/trigger, and surface patterns that lead to overspending.

## ✨ Key Features

- **Secure Authentication** - JWT-based auth with Spring Security
- **Multi-Account Tracking** - Bank accounts, credit cards, loans, and savings
- **True Cashflow Calculation** - Factors in upcoming bills, credit balances, and minimum payments
- **Emotion & Trigger Tagging** - Tag purchases with emotional states and spending triggers
- **Transaction Import** - CSV upload with auto-categorization
- **Insights Dashboard** - Visualize spending patterns by category, emotion, and trigger
- **Smart Alerts** - Notifications for unusual spending and upcoming bills

## 🛠 Tech Stack

### Mobile App (React Native + Expo)
- React Native with TypeScript
- Expo for simplified development and testing
- React Navigation for routing
- Axios for API calls
- React Native Chart Kit for visualizations
- AsyncStorage for local caching

### Backend (Java Spring Boot)
- Java 17+
- Spring Boot 3 (Web, Security, Data JPA)
- Spring Security with JWT authentication
- PostgreSQL database
- Flyway for migrations
- Docker support

### DevOps
- GitHub Actions CI/CD
- Docker containerization
- Cloud deployment (Render/Railway/Fly.io)

## 📱 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- Docker and Docker Compose
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL (or use Docker)

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd neurobudget
```

2. **Start the backend**
```bash
cd backend
./mvnw spring-boot:run
```

3. **Start the mobile app**
```bash
cd frontend
npm install
npm start
```

4. **Run on your device**
- Install Expo Go on your phone
- Scan the QR code from the terminal

## 📚 Project Structure

```
neurobudget/
├── backend/           # Java Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/          # React Native mobile app
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   ├── navigation/
│   │   └── types/
│   ├── app.json
│   └── package.json
└── README.md
```


## 📄 License

MIT License
