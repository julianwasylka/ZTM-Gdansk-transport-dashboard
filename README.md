# ZTM Transport Dashboard 🚌

A full-stack web application for tracking public transport in Gdańsk (ZTM). The application allows users to register, manage their favorite bus stops, and view real-time arrival estimates and delays.

Built with a focus on **Clean Architecture**, **TypeScript**, and modular design.

## 🚀 Tech Stack

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB + Mongoose
* **Architecture:** Clean Architecture (Domain, Use Cases, Infrastructure, Interface layers)
* **Authentication:** JWT (JSON Web Tokens) + BCrypt
* **Documentation:** Swagger / OpenAPI

### Frontend
* **Framework:** Vue 3 (Composition API) + Vite
* **Language:** TypeScript
* **State Management:** Pinia
* **Routing:** Vue Router 4
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios (with Interceptors)
* **Testing:** Vitest (Unit/Component), Cypress (E2E)

## ✨ Key Features

* **Clean Architecture:** Strict separation of concerns on the backend (Entities, Use Cases, Repositories).
* **Value Objects:** Implementation of Domain-Driven Design (DDD) concepts (e.g., `Password`, `Login` value objects).
* **Real-time Data:** Integration with Gdańsk Open Data API (CKAN) for live bus departures.
* **Caching Strategy:** Server-side caching of heavy static resources (stops list) to optimize performance.
* **Secure Auth:** Full registration/login flow with hashed passwords and JWT protection.
* **Custom Vue Features:** Custom Directives (e.g., coloring delays), Composables (`useStops`), and Plugins (`MyLogger`).
