# Car Dealership Backend API

A RESTful API for managing cars, categories, managers, and customers in a car dealership, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

---

## Features

- **Authentication:** JWT-based login for managers and customers
- **Role-based Access:** Admin/manager-only endpoints for sensitive operations
- **CRUD Operations:** Full CRUD for Cars, Categories, Managers, and Customers
- **Car Purchase:** Customers can purchase cars (with availability checks)
- **Filtering & Pagination:** Powerful `/cars` endpoint with filters (brand, model, price, etc.) and pagination
- **Validation & Error Handling:** Robust input validation and informative error responses
- **Testing:** Unit and integration tests with Jest & Supertest
- **Documentation:** Postman collection with example requests and responses

---

## Tech Stack

- **Node.js** / **Express**
- **TypeScript**
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **Jest** & **Supertest** for testing

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-username/car-dealership.git
cd car-dealership
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/car_dealership
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the server

```sh
npm run dev
```

### 5. Run tests

```sh
npm test
```

---

## API Endpoints

### **Authentication**

- `POST /auth/register` — Register a manager
- `POST /auth/login` — Login as manager
- `POST /customers/register` — Register a customer
- `POST /customers/login` — Login as customer

### **Cars**

- `GET /cars` — List cars (supports filters & pagination)
- `POST /cars` — Create a car (admin/manager only)
- `GET /cars/:id` — Get car details
- `PATCH /cars/:id` — Update a car (admin/manager only)
- `DELETE /cars/:id` — Delete a car (admin/manager only)

### **Categories**

- `GET /categories` — List categories
- `POST /categories` — Create category (admin/manager only)
- `GET /categories/:id` — Get category details
- `PATCH /categories/:id` — Update category (admin/manager only)
- `DELETE /categories/:id` — Delete category (admin/manager only)

### **Managers**

- `GET /managers` — List managers (admin only)
- `PATCH /managers/:id` — Update manager (admin only)
- `DELETE /managers/:id` — Delete manager (admin only)

### **Customers**

- `GET /customers` — List customers (admin/manager only)
- `POST /customers/purchase` — Purchase a car (customer only)

---

## Filtering & Pagination Example

`GET /cars?brand=Toyota&price[gte]=10000&price[lte]=30000&page=2&limit=10`

---

## Postman Collection

A complete Postman collection with example requests and responses is included in the `/postman` folder.

---

## Testing

- Run all tests with `npm test`
- Tests cover authentication, car CRUD, manager CRUD, and car purchase flow

**Sample Jest/Mongoose test setup:**

```typescript
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/car_dealership_test'); // Use a test DB
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
```

---

## License

MIT

---

## Author

Oladele Tobiloba  
https://github.com/towbee98
