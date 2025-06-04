car-dealership-api/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │   └── jwt.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── car.controller.ts
│   │   ├── category.controller.ts
│   │   └── customer.controller.ts
│   │
│   ├── models/
│   │   ├── car.model.ts
│   │   ├── category.model.ts
│   │   ├── customer.model.ts
│   │   └── manager.model.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── car.routes.ts
│   │   ├── category.routes.ts
│   │   └── customer.routes.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── car.service.ts
│   │   └── customer.service.ts
│   │
│   ├── utils/
│   │   └── logger.ts
│   │   └── validators.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
│   ├── unit/
│   │   ├── car.controller.test.ts
│   │   └── auth.service.test.ts
│   └── integration/
│       └── car.routes.test.ts
│
├── .env
├── .gitignore
├── postman_collection.json
├── tsconfig.json
├── package.json
└── README.md
