# CareerVault

CareerVault is a full-stack web application for creating and managing resumes in one place.

Users can create an account, create resumes, edit them later, view their resume, download it as a PDF, and delete resumes or their account when needed.

## Features

* User signup and login
* Supabase authentication
* Dashboard for managing resumes
* Create a new resume
* Edit existing resumes
* View resume details
* Download resume as PDF
* Delete resumes
* Delete user account
* User-specific resume data
* Protected API routes
* Responsive dark-themed interface

## Tech Stack

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** Supabase Auth
* **Version Control:** Git and GitHub

## How It Works

After signing up and logging in, a user can access the dashboard and manage their resumes.

Each resume is stored in the PostgreSQL database and linked to the user who created it. This means users can only access their own resumes.

The application uses Supabase for authentication and Prisma to communicate with the PostgreSQL database.

## Main Pages

* `/` - Home page
* `/login` - User login
* `/signup` - Create account
* `/dashboard` - View and manage resumes
* `/create-resume` - Create a new resume
* `/resume` - View a resume
* `/edit-resume` - Edit a resume

## Database

The application uses PostgreSQL with Prisma ORM.

There are two main models:

### User

Stores basic user information such as:

* Name
* Email
* Account creation date

### Resume

Stores:

* Resume title
* Resume content
* User ID
* Creation date
* Last updated date

A user can have multiple resumes, and each resume belongs to one user.

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/kshitijsingh820-ats/Career-Vault.git
```

### 2. Go to the project folder

```bash
cd Career-Vault
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file in the root directory and add the required Supabase and database environment variables.

Do not upload the `.env` file to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Project Structure

```text
src/
└── app/
    ├── api/
    │   ├── account/
    │   ├── resumes/
    │   ├── test/
    │   └── users/
    │
    ├── components/
    ├── create-resume/
    ├── dashboard/
    ├── edit-resume/
    ├── login/
    ├── resume/
    ├── signup/
    ├── lib/
    │   ├── prisma.ts
    │   └── supabase/
    │
    └── page.tsx

prisma/
└── schema.prisma
```

## What I Learned

While building CareerVault, I worked with:

* Next.js App Router
* React components and state
* TypeScript
* API routes and HTTP methods
* PostgreSQL
* Prisma ORM
* Supabase authentication
* Authentication-based authorization
* CRUD operations
* Database relationships
* Git and GitHub
* Production builds and deployment preparation

## Future Improvements

Some features that could be added later include:

* Resume templates
* Profile photo support
* More resume sections
* Better PDF formatting
* Resume sharing through a public link

## Author

**Kshitij Singh Parihar**

Built as a full-stack learning and portfolio project.
