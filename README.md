# Book Review Platform

A full-stack web application for reviewing and rating books. Built with React, Node.js, Express, and Prisma.

![Book Review Platform Screenshot]

## Features

- User authentication (Signup/Login/Logout)
- Browse books with filters (author, genre)
- Paginated book listings
- View book details and reviews
- Add new books (authenticated users)
- Submit and view reviews with ratings
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- React Icons

### Backend
- Node.js with Express
- Prisma ORM
- JWT for authentication
- SQLite database (can be configured for others)
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd bookreview
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret_here"
PORT=3001
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Start the backend server:

```bash
npm start
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books?page=1&limit=5&author=name&genre=genre` - Get paginated books with optional filters
  - Query Parameters:
    - `page` - Page number (default: 1)
    - `limit` - Items per page (default: 5)
    - `author` - Filter by author name (case-insensitive)
    - `genre` - Filter by genre (case-insensitive)
- `GET /api/books/:id` - Get book by ID with reviews
- `POST /api/books` - Add a new book (authenticated)

### Reviews
- `GET /api/reviews/:bookId` - Get reviews for a book
- `POST /api/reviews/:bookId` - Add a review (authenticated)

## Environment Variables

### Backend
- `PORT` - Server port (default: 3001)
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - Secret for JWT token generation

### Frontend
- `REACT_APP_API_URL` - Backend API URL

## Database Schema

### Book
- id: Int (PK)
- title: String
- author: String
- genre: String
- publishedYear: Int
- description: String
- createdAt: DateTime
- updatedAt: DateTime

### User
- id: Int (PK)
- name: String
- email: String (unique)
- password: String
- createdAt: DateTime
- updatedAt: DateTime

### Review
- id: Int (PK)
- rating: Int (1-5)
- reviewText: String
- userId: Int (FK to User)
- bookId: Int (FK to Book)
- user: Object (with name, email) - Populated in responses
- createdAt: DateTime
- updatedAt: DateTime

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
