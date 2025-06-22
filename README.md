# Task Manager Desktop Application

## Application Description

This is a desktop task management application  allows users to create, view, update, delete, and manage their tasks.

---

## Setup Instructions

To set up and run the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Docker](https://www.docker.com/) and Docker Compose

### 1. Clone and Install Dependencies

First, clone the repository and install the required npm packages.

```bash
git clone https://github.com/rotem2022/task-manager-electron
cd task-manager-electron
npm install
```

### 2. Start the Database

The project includes a `docker-compose.yml` file to easily run a PostgreSQL database in a Docker container.

```bash
docker-compose up -d
```

This command will start the database container in the background.

### 3. Run Database Migrations

Once the database is running, apply the database schema using Prisma Migrate.

```bash
npx prisma migrate dev
```

This will create the necessary tables and apply any pending migrations.

### 4. Run the Application

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

This command uses `electron-builder` to create a distributable installer for your operating system. The final installation file (e.g., `.dmg` for macOS, `.exe` for Windows) will be located in the `release/` directory.

---

## Architecture Decisions

The application is built on a robust and modern tech stack:

- **Electron:** For creating a cross-platform desktop application using web technologies.
- **React:** For building the user interface in a component-based, declarative way.
- **Vite:** As a build tool and development server.
- **TypeScript:** For static typing, improving code quality, and reducing bugs.
- **Prisma:** As the ORM for interacting with the database.
- **PostgreSQL:** The database for storing task data, run via Docker for easy setup.


## Known Limitations

- **No User Authentication:** The application is currently single-user and does not have a login or user management system.
- **No Real-time Updates:** If the database is modified by another source, the UI will not update automatically. It only refreshes upon user actions.
- **Basic UI/UX:** The user interface is functional but lacks advanced features like drag-and-drop, animations, or themes.
- **Limited Backend Validation:** There is minimal validation on the backend for incoming data.
