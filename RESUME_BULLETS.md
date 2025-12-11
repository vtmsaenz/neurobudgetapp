# NeuroBudget - Resume Bullet Points

## For Software Engineering Roles

**NeuroBudget – Emotion-Aware Personal Finance Tracker | Java, Spring Boot, React Native, PostgreSQL**

- Architected and developed a full-stack mobile application that tracks cashflow across multiple account types (checking, credit, loans) while capturing emotional triggers and spending patterns to help users with ADHD understand their financial behaviors

- Implemented secure RESTful API using Java 17 and Spring Boot 3 with JWT-based authentication, BCrypt password hashing, and token refresh mechanism, enabling stateless authentication across iOS and Android platforms

- Designed normalized PostgreSQL database schema with Flyway migrations to support multi-account tracking, emotion tagging (10 emotions, 10 triggers), and transaction categorization with proper indexing for optimized query performance

- Built React Native mobile application with Expo framework featuring navigation flow, authentication context management, and Axios interceptors for automatic JWT token refresh without user disruption

- Developed cashflow calculation algorithm that aggregates real-time balances across bank accounts, credit cards, and loans while factoring in credit limits, minimum payments, and upcoming bills to provide accurate "available to spend" metrics

## For Mobile Developer Roles

**NeuroBudget – Cross-Platform Mobile Finance App | React Native, TypeScript, Expo, Spring Boot**

- Developed cross-platform mobile application using React Native and Expo enabling iOS and Android deployment from single codebase, implementing native navigation patterns with React Navigation and bottom tab navigation

- Integrated RESTful API communication using Axios with request/response interceptors for automatic JWT authentication, token refresh handling, and error management to ensure seamless user experience across network conditions

- Implemented React Context API for global authentication state management, AsyncStorage for secure token persistence, and conditional navigation rendering based on authentication status

- Designed mobile-first UI components with responsive layouts, custom styling, and platform-specific behaviors for optimal user experience on both iOS and Android devices

## For Backend/Integration Engineer Roles

**NeuroBudget – Financial Services REST API | Java 17, Spring Boot 3, PostgreSQL, Spring Security**

- Engineered enterprise-grade REST API with Spring Boot following three-tier architecture (Controller-Service-Repository) to support mobile client with endpoints for user management, account operations, transaction processing, and cashflow analytics

- Implemented comprehensive security architecture using Spring Security with JWT authentication, custom authentication filters, password encryption with BCrypt, role-based access control (USER/ADMIN), and CORS configuration for mobile origins

- Designed and optimized relational database schema with JPA entities, custom repository queries using JPQL, and database migrations using Flyway for version-controlled schema evolution and rollback capabilities

- Developed complex business logic for multi-account cashflow calculations aggregating data across different account types (checking, savings, credit cards, loans) with proper handling of credit limits, minimum payments, and transaction categorization

- Built request/response validation using Jakarta Validation annotations, custom exception handling, and standardized error responses following REST API best practices for consistent client-side error handling

## For Full-Stack Roles

**NeuroBudget – Full-Stack Mobile Finance Platform | Java, Spring Boot, React Native, PostgreSQL**

- Built production-ready full-stack application from ground up featuring Java Spring Boot backend API, React Native mobile frontend, PostgreSQL database, and JWT authentication supporting secure multi-user operations

- Implemented end-to-end user flows including registration, login with token refresh, multi-account management, transaction creation with emotion/trigger tagging, and real-time cashflow summaries with optimized queries and proper data validation

- Containerized PostgreSQL database using Docker Compose for consistent local development environment and integrated Flyway database migrations for automated schema versioning across development and production environments

- Established RESTful API design patterns with proper HTTP methods, status codes, request/response DTOs for separation of concerns, and Lombok annotations to reduce boilerplate code while maintaining clean architecture

## Customizable Bullets (Pick 2-3)

**Technical Skills Emphasis:**
- Utilized Spring Data JPA for database operations with custom query methods, JPQL queries for complex filtering by date ranges and emotion tags, and proper entity relationship mapping (one-to-many, many-to-one) with lazy loading

**Problem-Solving Emphasis:**
- Solved complex cashflow calculation problem by designing algorithm that differentiates between actual cash, credit availability, and debt obligations while accounting for upcoming bills and minimum payment requirements

**Impact/Domain Emphasis:**
- Addressed real-world problem for users with ADHD by combining traditional expense tracking with emotional awareness, enabling users to identify patterns like "stress + social media → impulse purchases" through data visualization

**Testing/DevOps (if you add these):**
- Implemented comprehensive test coverage with JUnit for unit testing service layer, Spring MockMVC for integration testing REST controllers, and H2 in-memory database for repository tests achieving X% code coverage

**CI/CD (if you add this):**
- Established CI/CD pipeline using GitHub Actions to run test suites on pull requests, perform code quality checks, and automate deployment of backend services to cloud platform with zero-downtime releases

## Talking Points for Each Bullet

Use these to expand during interviews:

**"Architected full-stack application..."**
- Explain three-tier architecture
- Why separation of concerns matters
- How DTOs prevent over-exposure of entities

**"Implemented JWT authentication..."**
- Token vs. session-based auth tradeoffs
- Why refresh tokens improve UX
- How interceptors work

**"Designed database schema..."**
- Multi-account challenge
- Why enums for emotions/triggers
- Index strategy for common queries

**"Built React Native app..."**
- Why Expo (vs. pure React Native)
- Cross-platform considerations
- State management approach

**"Developed cashflow algorithm..."**
- Credit vs. cash complexity
- How minimum payments factor in
- Edge cases you handled

## Keywords for ATS (Applicant Tracking Systems)

Make sure these appear somewhere in your resume/project description:
- Java, Spring Boot, Spring Security, Spring Data JPA
- React Native, Expo, JavaScript, TypeScript
- PostgreSQL, Flyway, Database Migrations
- RESTful API, Microservices, JWT Authentication
- Mobile Development, iOS, Android, Cross-Platform
- Git, Docker, Maven, npm
- Agile, Test-Driven Development (if applicable)

## GitHub README Snippet

```markdown
## NeuroBudget
A mobile-first personal finance application that helps users understand their spending patterns by tracking the emotional context behind their purchases.

### Tech Stack
- **Backend:** Java 17, Spring Boot 3, Spring Security, PostgreSQL
- **Frontend:** React Native, Expo, React Navigation
- **Authentication:** JWT with refresh tokens
- **Database:** PostgreSQL with Flyway migrations
- **Development:** Docker Compose, Maven, npm

### Key Features
- Multi-account tracking (checking, savings, credit cards, loans)
- Emotion and trigger tagging for transactions
- Real-time cashflow calculations
- Secure JWT authentication
- Cross-platform mobile app (iOS & Android)
```

Remember: Tailor bullets to each specific job description. If they emphasize microservices, highlight the RESTful API. If they want mobile experience, lead with React Native. Always make it about the business value, not just the technology.
