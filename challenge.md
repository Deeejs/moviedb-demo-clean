# **Overview**

Create a **Node.js** backend using **NestJS** and **TypeScript** for managing a list of movies. The backend should allow users to view and edit information about **Movies, Actors, and Movie Ratings**. The frontend will be a **Next.js** application built with **TypeScript** and **TailwindCSS**, consuming the backend API.

---

## **Backend Requirements (NestJS + TypeScript + TypeORM)**

### **General Requirements**

- Implement a **NestJS** backend with **TypeScript**.
- Use an **ORM** (TypeORM, Prisma, Drizzle, etc) with your database of choice and use a **code-first** approach for defining the schema.
- Implement **CRUD** (Create, Retrieve, Update, Delete) endpoints for:
  - **Movies**
  - **Actors**
  - **Movie Ratings**
- Seed the database with some sample data.

### **API Functional Requirements**

- Implement **search functionality** that allows partial searches for **Movies or Actors** by name.
- Implement relationships:
  - A **Movie** can have multiple **Actors**.
  - A **Movie** can have multiple **Ratings**.
  - An **Actor** can be in multiple **Movies**.
- Implement an API endpoint to:
  - View all **Movies** an **Actor** has been in.
  - View all **Actors** in a given **Movie**.

### **Security**

- Require an **API secret/token** for `Create`, `Update`, and `Delete` operations.
- Implement **middleware** for token validation (e.g., NestJS **Guards**).
- The API secret/token can be hardcoded for simplicity.

### **Validation & Error Handling**

- Properly validate requests and return appropriate **HTTP responses** and **status codes**.
- Ensure the API does not crash due to bad requests or unhandled errors.

### **Bonus Features**

- Implement **Docker** support for both the backend and database.
- Implement **authentication** with JWT (e.g., NestJS **Passport** module).
- Implement **unit tests** for your backend.
- Implement a basic **GitLab CI/CD pipeline** to automate testing and deployments.

---

## **Frontend Requirements (Next.js + TypeScript + TailwindCSS)**

### **General Requirements**

- Implement a **Next.js** frontend in **TypeScript**.
- Use **TailwindCSS** for styling.
- Use an API library (Axios, SWR, React Query, etc) to access your backend.
- Display data from the backend API.

### **Core Features**

- Create a UI to:
  - **List** all Movies and Actors.
  - **Search** for Movies or Actors by name.
  - **View details** of a Movie (including Actors and Ratings).
  - **View details** of an Actor (including Movies they appeared in).
- Ensure UI is **responsive**, particularly on mobile devices.

### **Bonus Features**

- Implement client-side **authentication** screen (doesn't have to be fancy).
- Implement **pagination** when listing Movies and Actors.
- Implement **unit tests** for your frontend.

---

## **Project Submission Requirements**

- Upload the project to a **public GitHub repository** and share the link.
- Ensure the project can be run on **Windows, macOS, and Linux**.
- Include a **README** file with instructions on:
  - How to set up and run the backend/frontend locally.
  - How to use the API endpoints.
  - Any additional comments you might have regarding your code.
- Ensure the code follows **SOLID principles**.
- Ensure the project **does not crash** and handles errors gracefully.
