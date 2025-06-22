# Task Manager Desktop Application

## Application Description

This is a desktop task management application  allows users to create, view, update, delete, and manage their tasks. The application provides a clean, single-page interface for a seamless user experience, with features like filtering by priority/status and sorting by due date.

---

## Setup Instructions

To set up and run the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Docker](https://www.docker.com/) and Docker Compose

### 1. Clone and Install Dependencies

First, clone the repository and install the required npm packages.

```bash
git clone <repository-url>
cd Task-Manager
npm install
```

### 2. Set Up Environment Variables

The application uses a PostgreSQL database managed by Prisma. You need to create a `.env` file in the root of the project with the database connection string.

Create a file named `.env` and add the following line:

```
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager?schema=public"
```

**Note:** You can change the `user` and `password` to anything you like, but make sure to use the same credentials in the `docker-compose.yml` file.

### 3. Start the Database

The project includes a `docker-compose.yml` file to easily run a PostgreSQL database in a Docker container.

```bash
docker-compose up -d
```

This command will start the database container in the background.

### 4. Run Database Migrations

Once the database is running, apply the database schema using Prisma Migrate.

```bash
npx prisma migrate dev
```

This will create the necessary tables and apply any pending migrations.

### 5. Run the Application

Finally, start the application in development mode.

```bash
npm run dev
```

This will launch the Electron application.

---

## Build Instructions

To create a production build of the application, run the following command:

```bash
npm run build
```

This command uses `vite build` to compile the React/TypeScript code and `vite-plugin-electron` to package the Electron main and preload scripts. The output will be located in the `dist` and `dist-electron` directories, ready for packaging with tools like Electron Builder or Electron Forge.

---

## Architecture Decisions

The application is built on a robust and modern tech stack:

- **Electron:** For creating a cross-platform desktop application using web technologies.
- **React:** For building the user interface in a component-based, declarative way.
- **Vite:** As a build tool and development server.
- **TypeScript:** For static typing, improving code quality, and reducing bugs.
- **Prisma:** As the ORM for interacting with the database.
- **PostgreSQL:** A powerful, open-source relational database, run via Docker for easy setup.


## Known Limitations

- **No User Authentication:** The application is currently single-user and does not have a login or user management system.
- **No Real-time Updates:** If the database is modified by another source, the UI will not update automatically. It only refreshes upon user actions.
- **Basic UI/UX:** The user interface is functional but lacks advanced features like drag-and-drop, animations, or themes.
אין ולידציה בבאק אנד
