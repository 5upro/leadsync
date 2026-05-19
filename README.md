# Leadsync 

LeadSync is a smart lead management application designed to streamline the process of creating, retrieving, and exporting leads. The application features a robust backend built with Express.js, a database connection using Mongoose, and a frontend built with React. The project aims to provide a seamless user experience, allowing users to manage leads efficiently and effectively.

## Features

* User authentication and authorization using JWTs
* Lead creation, Modification, Deletion(CURD), and export functionality(CSV)
* Filtering, sorting, and pagination for lead data
* Error handling and notification system
* Theme management with light and dark modes
* Responsive design for a seamless user experience

## Tech Stack

* ### Frontend:
  
  + React
  + React Router
  + Tailwind CSS
    
* ### Backend:
  
  + Express.js
  + Mongoose
  + MongoDB
  + Zod
  + Swagger
    
* ### Authentication:
  
  + Access Token
  + Refresh Token
    
* ### Utilities:
  + Crypto
  + Jsonwebtoken
    
* ### Dependencies: 
  + `node`: The runtime
  + `pnpm`: The package manager used in the project
  + `docker`: For simpler and hassleless setup

## Installation

### To get started with the project, follow these steps:

1. Clone the repository using
   ```bash
   git clone https://github.com/5upro/leadsync
   ```

2. Install the dependencies using
   ```bash
   cd client pnpm install && cd .. && cd server pnpm install
   ```

3. Set up the environment variables in a `.env` file for both
   > refer `.env.example` in both directories for env var names

4. After the `MONGO_URI` is set run this in `server` directory:
   ```bash
   cd server && pnpm run seed
   ```
   > It will generate demo Leads and an Admin and Sales User
   
5. Start the app by running:
   ```bash
   docker compose up --build
   ```
> To stop the app run
  ```bash
docker compose down
  ```
   
## Usage

### To use the application, follow these steps:

1. Navigate to the client-side application in your web browser
2. Log in or register to access the dashboard
3. Create, retrieve, and export leads using the provided functionality
4. Filter, sort, and paginate lead data using the available options
5. Toggle between light and dark themes using the theme management system

## Project Structure

```markdown
server
├── src
│   ├── config
│   │   ├── db.ts
│   │   ├── swagger.ts
│   ├── middlewares
│   │   ├── global.authentication.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   ├── leads
│   ├── utils
│   │   ├── token.ts
├── client
│   ├── src
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── AuthPage.tsx
│   │   │   ├── DashboardPage.tsx
....
```
