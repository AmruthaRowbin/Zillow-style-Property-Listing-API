Property Listing Management System

This is a  backend service for managing property listings. The system supports user authentication, property creation and listing, and leverages Docker for containerization, MongoDB for data storage, Redis for caching, and JWT for security.

📁  Project Structure

propertylist/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── utils/
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
└── README.md



Features

🔐 JWT Authentication (register, login)

🏘️ CRUD for Properties

⚡ Redis Integration for performance

🚦 Rate Limiting using express-rate-limit

🧪 Unit Testing with Jest + Supertest

🐳 Dockerized (Mongo + Redis + Node server)

📫 Postman collection for API testing


Technologies Used

Tech                            	Description
Node.js	                         JavaScript runtime
Express.js	                     Web framework
MongoDB	NoSQL                      Database
Mongoose	                        MongoDB ODM
Redis	                            In-memory key-value store
Docker	                          Containerization
JWT	                             Secure Authentication
Nodemon	                       Dev server auto-reloader
Jest	                        Unit Testing
Postman	                       API Testing



API Endpoints


Auth Routes

Method	      Endpoint	                  Description
POST	       /api/v1/auth/register	     Register a user
POST	      /api/v1/auth/login	         Login a user


Property Routes (JWT protected)


Method	         Endpoint	                  Description
GET	           /api/v1/properties	          List all properties
POST	        /api/v1/properties	          Create new property
GET	         /api/v1/properties/:id	        Get single property
PUT	        /api/v1/properties/:id	        Update property
DELETE	   /api/v1/properties/:id	          Delete property



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
