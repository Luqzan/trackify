This is a responsive, single-page application (SPA) developed using NextJS with TypeScript. It was developed as part of the Software Developer Assessment (Frontend) for Qbeep Intelligent Systems.

## Features
- Sync data from the API.
- View sales order details.
- View transaction details.
- Filter (search, sort, and filter) in the listing.
- Click pagination in the listing.
- Edit sales status in order details.
- Edit/delete data.

## Bonus Features
- State management strategies integrated (Zustand, useState Hook, React Context API, or Redux).
- Developed using Next.js Framework.

## Getting Started

### Prerequisites
- Ensure you have a server established.
- Tools to run a Next.js project (e.g., NPM).

### Installation

1. Clone the repository.
   
2. Rename the environment file from env.example to .env

3 Update the .env file with your database details. The format for the database connection is:

plaintext
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
Switch out postgresql to mysql if you are using SQL.

4. Install dependencies:
npm install

5. Migrate and seed the database:
npx prisma migrate dev --name init
npx prisma db seed

6. Launch the development server:
npm run dev
The development server will run at http://localhost:3000.

6. Register an account.

Support
If you encounter any issues, feel free to contact me at luqzanariff@gmail.com.
