# INTERNSHIP
> 19th ASSIGNMENT

### Full-Stack Quiz App

This is a full-stack web application built to create and solve quizzes. The goal of the project was to expand my understanding of full-stack architecture as well as monorepo structuring, API development, secure user authentication, and the whole process of deployment.

The application supports both admin and user roles. Admins can manage quizzes, categories, and view results, while users can take quizzes and see their own scores.

### Key Features
- JWT-based authentication and authorization
- Swagger API documentation for backend routes
- Role-based access control
- Admin dashboard for adding categories, creating quizzes, and viewing results
- User dashboard for taking quizzes and viewing personal scores
- Custom React hooks for API communication
- Higher-order component for wrapping private routes
- Error handling and form validation

### Technologies used
- **Frontend**: React, TypeScript, Vite, Axios
- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL (via pgAdmin), Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Package Manager**: Yarn
- **Monorepo Tooling**: Turbo
- **Dev Tools**: Visual Studio Code
- **UI**: Material-UI (MUI), Google Fonts
- **Deployment**: Vercel (frontend), Render (backend and database)


## Installation and running
To run this project locally, you need to have the following installed:
1. **A modern web browser**
2. **Visual Studio Code** (optional, but recommended)
3. **Yarn**
4. **Node.js**
5. **PostgreSQL + pgAdmin**

Steps to Install the Project:
1. **Clone and open the Repository**:
   Open a terminal (or command prompt on your machine) and run the following commands:
   ```bash
   git clone https://github.com/ivonaaaa/Internship-Quiz.git
   ```
   ```bash
   cd Internship-Quiz
   ```
2. **Open the project in VS Code**:
   In the same terminal type in this command:
   ```bash
   Code .
   ```

3. **Install the dependencies in root and both workspaces (backend and frontend)**:
   Once you're in the VS Code, open a terminal and type in this command in root and each directory (use cd command for navigating through directores):    
   ```bash
   yarn install
   ```

5. **Create a database:**
   Open pgAdmin and create a new database. Take note of your connection credentials as you will use this in your .env file as DATABASE_URL.
   
   
6. **Set up the environment variables:**
   Create a .env file in the root of the project and add your credentials:
   ```bash
   DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<name>"
   JWT_SECRET=your_jwt_secret_here
   ```

7. **Run migrations and seed the database (from the backend directory)**:
   ```bash
   yarn prisma migrate dev --name init
   ```
   ```bash
   yarn seed:render
   ```

8. **Start the application**:
   Use Turborepo to start both workspaces:
   ```bash
   yarn dev
   ```
   Open in Browser: Visit the URL provided in the terminal (usually http://localhost:5173) to explore the app.


#### ADMIN Login credentials: ivona@gmail.com, ivona123
