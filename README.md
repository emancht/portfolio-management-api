# Assignment of module-20 (Portfolio Management System)

This is a MERN (MongoDB, Express, React, Node.js) Portfolio Management API that allows users to register, authenticate, and manage portfolios.

## Features

-   User Authentication (Register, Login, Logout)
-   CRUD operations for portfolios
-   Middleware for authentication
-   File upload support (Multer)

## Installation

### Prerequisites

-   Node.js
-   MongoDB

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/emancht/portfolio-management-api.git
    cd portfolio-management
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the root directory and configure it as shown below:
    ```env
    MONGO_URI=<your_database_uri>
    PORT=5000
    CLIENT_URL=<your_client_uri>
    JWT_KEY=<jwt_secret_key>
    JWT_EXPIRE_TIME=<jwt_expiration_time>
    ```
4. Start the server:
    ```sh
    npm start  or
    npm run dev
    ```

## API Routes

### User Routes

| Method | Endpoint  | Description                 |
| ------ | --------- | --------------------------- |
| POST   | /Register | User registration           |
| POST   | /Login    | User login                  |
| GET    | /Logout   | User logout (Authenticated) |

### Portfolio Routes

| Method | Endpoint                      | Description                            |
| ------ | ----------------------------- | -------------------------------------- |
| POST   | /CreatePortfolio              | Create a portfolio (Authenticated)     |
| GET    | /ReadPortfolio/:portfolioID   | Get portfolio details                  |
| POST   | /UpdatePortfolio/:portfolioID | Update a portfolio (Authenticated)     |
| GET    | /DeletePortfolio/:portfolioID | Delete a portfolio (Authenticated)     |
| GET    | /PortfolioList                | Get list of portfolios (Authenticated) |

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB (Mongoose)
-   Multer (File Upload)
-   JSON Web Tokens (JWT) for authentication

## License

This project is licensed under the MIT License.

---

## Author

[Eman Chakma](https://github.com/emancht)
