Property Listing Management System

This is a Zillow-style Property Listing API built using the node js with express  , enhanced with JWT authentication, Redis caching, Rate Limiting, and Dockerized services.
It supports secure login, CRUD operations for properties, and powerful API features like filtering, search, and pagination.

📁  Project Structure

| Folder/File          | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `config/`            | Database and Redis configuration files                      |
| `controllers/`       | Route handler logic (e.g., `auth`, `property`)              |
| `docs/`              | API documentation (Postman collection)       |
| `jobs/`              | Scheduled background tasks (e.g., property updater)         |
| `middleware/`        | Custom middleware (auth, error handling,role,)              |
| `models/`            | Mongoose models (`User`, `Property`, etc.)                  |
| `routes/`            | API route definitions                                       |
| `test/`              | Unit and integration tests using Jest & Supertest           |
| `utils/`             | Utility/jsonwebtoken                                   |
| `.env`               | Environment variable definitions                            |
| `.gitignore`         | Ignore files like `node_modules`, `.env`, log files, etc.   |
| `Dockerfile`         | Instructions to build the Docker image                      |
| `docker-compose.yml` | Docker multi-container orchestration configuration          |
| `package.json`       | Project metadata, scripts, and dependencies                 |
| `server.js`          | Application entry point (starts server and background jobs) |
| `README.md`          | Project overview, setup instructions, and documentation     |





Features

| Feature                       | Description                                                             |
| ----------------------------- | ----------------------------------------------------------------------- |
| 🔐 JWT Authentication         | Secure login and user registration with tokens                          |
| 🏠 CRUD for Properties        | Add, update, delete, and list property listings                         |
| ⚡ Redis Integration           | First-time fetch from MongoDB → cached in Redis for faster future loads |
| 📄 Pagination, Search, Filter | Easily list properties with filters, keyword search, and pagination     |
| 🚦 Rate Limiting              | Prevents abuse of API endpoints                                         |
| 🧪 Unit Testing (Jest)        | Test critical routes using Jest and Supertest                           |
| 🐳 Docker Support             | Run Redis + Mongo + Node API server using Docker Compose                |
| 📬 Postman Collection         | Provided for testing all routes                                         |


Technologies Used

| Tech              | Description                                   |
|-------------------|-----------------------------------------------|
| Node.js           | JavaScript runtime                            |
| Express.js        | Web framework                                 |
| MongoDB           | NoSQL database                                |
| Mongoose          | MongoDB ODM (Object Document Mapper)          |
| Redis             | In-memory key-value store                     |
| JWT               | JSON Web Token Authentication                 |
| Docker            | Containerization                              |
| Nodemon           | Dev server auto-reloader                      |
| Jest & Supertest  | Testing tools                                 |
| Postman           | API testing tool                              |




Redis Cache Logic

When /api/v1/properties is called:

First checks in Redis if the property list exists.

If found (cache hit) → returns cached data.

If not found (cache miss) → fetches from MongoDB, stores the result in Redis for future calls.

On new property addition (POST /api/v1/properties) or update/delete, the cached properties key is cleared from Redis to maintain consistency.

Filtering, Searching & Pagination

The endpoint /api/v1/properties supports the following query parameters:


| Query Param | Description                   | Example                               |
| ----------- | ----------------------------- | ------------------------------------- |
| `location`  | Filter properties by location | `/api/v1/properties?location=Kochi`   |
| `search`    | Search by title/description   | `/api/v1/properties?search=penthouse` |
| `page`      | Pagination page number        | `/api/v1/properties?page=2`           |
| `limit`     | Number of items per page      | `/api/v1/properties?limit=10`         |



You can combine them like:
GET /api/v1/properties?location=Kochi&page=1&limit=10&search=premium



API Endpoints


Auth Routes

| Method | Endpoint                | Description     |
| ------ | ----------------------- | --------------- |
| POST   | `/api/v1/auth/register` | Register a user |
| POST   | `/api/v1/auth/login`    | Login a user    |



 Property Routes (JWT Protected)


| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| GET    | `/api/v1/properties`     | List all properties |
| POST   | `/api/v1/properties`     | Create new property |
| GET    | `/api/v1/properties/:id` | Get single property |
| PUT    | `/api/v1/properties/:id` | Update property     |
| DELETE | `/api/v1/properties/:id` | Delete property     |




How to Run

🐳 Using Docker Compose

This project supports Docker out of the box. You can use Docker to spin up the app along with MongoDB and Redis using the included `Dockerfile` and `docker-compose.yml`.

✅ Dockerfile — already added to repo  
✅ docker-compose.yml — already added

Docker Compose Commands:-

docker-compose up --build

To stop  : docker-compose down


Without Docker (for dev)
npm install
npm run dev

Make sure to use:env

MONGO_URI=mongodb://localhost:27017/propertylist

REDIS_HOST=localhost



📬 API Testing with Postman
You can test the APIs using the Postman collection provided in the `/docs` folder.

How to Use:
Open Postman.

Go to File > Import.

Choose the file:

docs/propertylist_postman_collection.json

The collection will appear in your workspace under "Collections".

Now you can test the following:

User Registration,

Login,

CRUD for Properties,

Protected Routes (RBAC)


.env file 

PORT=5000

MONGO_URI=mongodb://mongo:27017/propertylist

JWT_SECRET=myjwtsecret

REDIS_HOST=redis


Testing

This project uses Jest and Supertest for unit and integration testing of the API endpoints.


🔄 Background Job (Scheduled Task)

A background task is scheduled to run every 1 hour using `setInterval`. It updates all property documents' `updatedAt` field with the current timestamp.


This task is defined in `/jobs/updateProperties.js` and helps in simulating active listings.


✅ How to Test it
1. Run the server:
2. Wait for the log:
    "Running background update task...
     Updated X properties"
