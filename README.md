
# Project Documentation

This documentation outlines the structure, purpose, and methods used in a web application built with Next.js and NextAuth.js for user authentication. This project aims to implement user authentication successfully and simply using GitHub and Google OAuth providers, as well as email/password combinations. It also utilizes MongoDB for storing user data.

## Project Purpose
The aim of this project is to create a secure and scalable user authentication system using modern web technologies. The project allows users to log in with their GitHub or Google accounts, as well as with traditional email and password combinations.

## Technologies and Tools Used

- **Next.js**: A React-based framework that provides server-side rendering (SSR) and static site generation (SSG) features.
- **NextAuth.js**: An authentication library that supports various authentication providers.
- **MongoDB**: A NoSQL database used to store user data.
- **Mongoose**: An ODM (Object Data Modeling) library for working with MongoDB.
- **Bcrypt**: A library used to securely hash and validate user passwords.

## Project Structure

- **`app/`**: Main application directory.
  - **`(models)/User.js`**: Defines the user schema and interacts with MongoDB.
  - **`api/auth/[...nextauth]/options.js`**: Contains the NextAuth.js authentication configuration.
  - **`api/Users/route.js`**: API route for creating and verifying users.
  - **`UserForm.jsx`**: Component containing the user registration form.
  - **`middleware.js`**: Middleware for user roles and access control.
- **`lib/`**: Contains helper libraries.
  - **`mongoose.js`**: Manages the MongoDB connection.
- **`.env.local`**: Contains environment variables.
- **`package.json`**: Defines project dependencies and scripts.
- **`next.config.js`**: Next.js configuration file.

## Authentication Providers

1. **GitHub Provider**:
   - Allows users to log in with their GitHub accounts.
   - Retrieves GitHub profile information and determines user roles.

2. **Google Provider**:
   - Allows users to log in with their Google accounts.
   - Retrieves Google profile information and determines user roles.

3. **Credentials Provider**:
   - Allows users to log in with an email and password combination.
   - Hashes and validates passwords using bcrypt.

## Database Management

- **Mongoose**:
  - Used to interact with the MongoDB database.
  - The user schema is defined in the `User.js` file.
  - The `mongoose.js` file manages the MongoDB connection and provides a reusable connection.

## User Roles and Middleware

In this project, users are assigned roles, and these roles are used to control access to certain pages. Role-based access control is implemented using Next.js middleware.

### Middleware

**`app/middleware.js`**:
```javascript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth((req) => {
    console.log("req.nextUrl.pathname", req.nextUrl.pathname);
    console.log("req.nextauth.token.role", req.nextauth.token.role);

    if (req.nextUrl.pathname === "/CreateUser" && req.nextauth.token.role !== "admin") {
        return NextResponse.rewrite( new URL("/Denied", req.url));
    }
},
{
    callbacks: {
        authorized: ({ token }) => !!token,
    }
});

export const config = { matcher: ["/CreateUser"] };  // matcher ile CreateUSer sayfasını koruma altına alıyoruz
```

### Explanations

- The **`middleware.js`** file intercepts requests to specific URL patterns (e.g., `/admin`).
- The user JSON Web Token (JWT) is obtained using the `getToken` function.
- Based on the path of the requested page (`pathname`), the user's role is checked.
- If the user is not authorized, they are redirected to the `/unauthorized` page.

### Important Functions and Methods

- **Hashing and Validation**:
  - User passwords are securely hashed using bcrypt (`bcrypt.hash`).
  - Password validation is performed during login (`bcrypt.compare`).

- **NextAuth.js Callbacks**:
  - **`jwt` Callback**: Adds user data to the JSON Web Token (JWT).
  - **`session` Callback**: Customizes session information and adds user roles.

## Getting Started

1. **Clone the repository and install dependencies**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file and add the necessary API keys and MongoDB URI.

3. **Start the application**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` in your browser to test user registration and authentication.

## Conclusion

This project aims to provide a secure and flexible authentication system using modern web technologies. With Next.js and NextAuth.js, users can log in using social media accounts or traditional email and password combinations. Database management is handled using MongoDB and Mongoose. User roles are assigned and controlled through middleware. This documentation summarizes the project's structure, purpose, and methods used.
