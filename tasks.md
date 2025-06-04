Here's a granular step-by-step MVP task plan based on the architecture:

🧱 Phase 1: Project Setup

1.  Initialize Project with TypeScript & Express

- **Start**: Create project folder
- **End**: `tsconfig.json`, `package.json`, `src/index.ts` with a working Express server

2.  Install and Configure Basic Dependencies

- **Start**: Add TypeScript, Express, dotenv, nodemon
- **End**: Scripts in `package.json`, environment support with `.env`

3.  Setup ESLint + Prettier

- **Start**: Install linting tools
- **End**: Codebase auto-formats and lint errors show in IDE

---

🔐 Phase 2: Authentication

4.  Create `User` model (e.g., Manager)

- **Start**: Define Mongoose schema
- **End**: `User` model file created and exported

5.  Implement JWT Token Utility

- **Start**: Create functions to sign and verify tokens
- **End**: Token is verifiable and secure

6.  Build Auth Controller (register/login)

- **Start**: Create `register` + `login` logic
- **End**: Tokens return on successful login/register

7.  Add Auth Routes

- **Start**: Wire up controller functions
- **End**: POST `/auth/register`, POST `/auth/login` routes working

8.  Create Auth Middleware

- **Start**: Write middleware to protect routes
- **End**: Can decode JWT and attach user to request

---

🚗 Phase 3: Cars CRUD

9.  Create `Car` model

- **Start**: Define schema (brand, model, year, price, available, etc.)
- **End**: Car model file created and exported

10. Build Create Car Controller

- **Start**: Implement logic to create a car
- **End**: Car is saved and returned

11. Build Get All Cars (w/ Pagination + Filters)

- **Start**: Accept filters via query params
- **End**: Returns paginated, filtered car list

### 12. Build Get Single Car Controller

- **Start**: Fetch car by ID
- **End**: Car details returned

13. Build Update Car Controller

- **Start**: Find and update car
- **End**: Car is updated and returned

14. Build Delete Car Controller

- **Start**: Remove car by ID
- **End**: Deleted confirmation

15. Wire Car Routes

- **Start**: Define `/cars` routes with middleware
- **End**: Full CRUD accessible via routes

---

👤 Phase 4: Managers CRUD

16. Create `Manager` model

- **Start**: Define schema (name, email, password, role)
- **End**: Model created and exported

17. Build Create Manager Controller

- **Start**: Create and hash password
- **End**: Manager record saved

18. Build Get All Managers Controller

- **Start**: Fetch all managers
- **End**: Return manager list

19. Build Update Manager Controller

- **Start**: Update details (except password)
- **End**: Manager updated and returned

20. Build Delete Manager Controller

- **Start**: Remove manager by ID
- **End**: Confirm deletion

21. Wire Manager Routes

- **Start**: Add routes in `/managers`
- **End**: Full CRUD enabled

---

🧪 Phase 5: Testing

22. Setup Jest + Supertest

- **Start**: Install and configure
- **End**: Can run `npm test` with output

23. Write Unit Test: Auth Flow

- **Start**: Test registration + login
- **End**: Validates token issuance

24. Write Unit Test: Car Endpoints

- **Start**: Test create, get, update, delete
- **End**: Verify full Car lifecycle

25. Write Unit Test: Manager Endpoints

- **Start**: Test all manager routes
- **End**: Verified manager CRUD

---

📄 Phase 6: Documentation

26. Setup Postman Collection

- **Start**: Import or create collection
- **End**: Collection with all routes saved

27. Add Example Requests/Responses

- **Start**: Fill in test cases
- **End**: Complete collection with working tests

Missed Phases

28. **Create `Customer` model (`customer.model.ts`)**
    ✅ Start: Define fields: name, email, purchases\[]
    ✅ End: Export schema

29. **Create `customer.controller.ts`**
    ✅ Start: Write `purchaseCar()` logic
    ✅ End: Associates customer with a car

## Car & Category Domain

30. **Create `Category` model (`category.model.ts`)**
    ✅ Start: Define fields (name, description)
    ✅ End: Export schema

31. **Modify `Car` model (`car.model.ts`)**
    ✅ Start: Support category & availability

32. **Add `category.controller.ts` with CRUD handlers**
    ✅ Start: Add `createCategory`, `getCategories`, etc.
    ✅ End: Categories stored/fetched
