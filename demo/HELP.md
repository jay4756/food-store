# Quickbite

A simple food delivery app with a React/Vite frontend and a Spring Boot MVC + JPA backend. The API stores menu items and orders in MySQL. Lombok and Spring Boot DevTools are included.

## Requirements

- Java 21
- Node.js 20.19+ or 22.12+
- MySQL 8+

## Run locally

1. Start MySQL. The default connection uses `localhost:3306`, database `quickbite`, user `root`, and a blank password. Set `DB_USERNAME` and `DB_PASSWORD` if your local MySQL credentials differ.
2. From the project root, start the API with `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`).
3. In a second terminal, change to `frontend/`, then run `npm install` and `npm run dev`.
4. Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

Set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` to override the MySQL connection. Set `PORT` to change the API port. Vite proxies `/api` calls to `http://localhost:8080` during development.

## API

- `GET /api/menu` returns the menu. The starter menu is inserted on first startup.
- `POST /api/orders` creates an order. Send `customerName`, `deliveryAddress`, and an `items` array containing `foodItemId` and `quantity`.

The Maven tests use an in-memory H2 database; normal application runs use MySQL.

## Where the code lives

- `frontend/src/App.jsx` keeps page state and connects the frontend components.
- `frontend/src/components/` contains the page sections and reusable UI pieces.
- `src/main/java/.../menu/` contains menu entities, repository, service, and controller.
- `src/main/java/.../orders/` contains order entities, repository, service, and controller.

## How an order works

1. React sends customer details and menu item IDs to `POST /api/orders`.
2. `OrderController` receives the HTTP request and calls `OrderService`.
3. `OrderService` checks the request, loads menu items through the repositories, and creates an order.
4. JPA saves the order and its order lines to MySQL. The service returns an `OrderResponse` to React.
