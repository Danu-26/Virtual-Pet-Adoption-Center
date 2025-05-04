 
 # run frontend using- npm run dev
 # run backend- node server.js
 
 
 # Super Admin Credentials
 Email: superadmin@gmail.com
 Password: superadmin1999
 Created using: scripts/createSuperAdmin.js

 # Landing Page & Authentication

 The landing page shows the Login form.
 Any user can register and log in.
 After login, users can:
     View all available pet profiles.
     See the Adopt option (only visible after login).
 Used JWT Authentication to protect routes.
 Created an Auth Middleware to check:
      If the user is logged in.
      If the user has the correct role (admin/superadmin).

 # Admin Access & Features
 Only users with the admin role can access the Admin Dashboard.
 Super Admin can create new admin users
Admin can
    Add pet profiles.
    Update pet profiles.
    Delete pet profiles.

# State Management: Done using Context API
# API Integration -frontend
All pet-related routes are managed inside /services/petService.jsx
Used a shared axiosInstance to automatically include the token in headers