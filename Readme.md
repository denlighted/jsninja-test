

## How to Run the Solution

## 1. Clone the Repository

    git clone <YOUR_REPO_URL>
    cd <YOUR_PROJECT_FOLDER>

## 2. Backend Setup

    cd backend
    yarn install

Create a `.env` file:

    DATABASE_URL="postgresql://postgres:root@localhost:5432/superherodb?schema=public"
    PORT=3000

Run migrations:

    npx prisma migrate dev --name init

Start backend:

    yarn start:dev

## 3. Frontend Setup

    cd frontend
    npm install
    npm run dev
