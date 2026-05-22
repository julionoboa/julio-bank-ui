# Bank UI

Frontend application for the banking system developed with Angular.

This application allows:
- Client management
- Account management
- Movements management
- Account statement visualization
- PDF report download

---

# Technologies

- Angular 20
- TypeScript
- Standalone Components
- Angular Router
- HttpClient
- Docker

---

# Features

- Client listing
- Account listing
- Movement creation
- Report generation
- PDF download
- Responsive UI
- REST API integration

---

# Run with Docker

```bash
docker compose up --build
```

---

# Run locally

## Install dependencies

```bash
npm install
```

## Start Angular

```bash
ng serve
```

---

# Application URL

```text
http://localhost:4200
```

---

# Backend Connection

The frontend consumes the backend API at:

```text
http://localhost:8080
```

---

# Project Structure

```text
src/app

├── core
├── shared
├── features
│   ├── clients
│   ├── accounts
│   ├── movements
│   └── reports
│
└── layouts
```

---

# Author

Julio Noboa