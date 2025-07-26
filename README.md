# Angular Assessment - Weekend Project

A comprehensive Angular 19 application demonstrating user authentication, role-based access control, CRUD operations, and modern UI/UX practices.

## 🚀 Project Overview

This project implements a full-stack Angular application with the following key features:

- **User Authentication** with role-based access (Admin/User)
- **CRUD Operations** for users and posts
- **Modern UI/UX** with responsive design
- **Template-Driven Forms** for data input
- **Custom Pipes and Directives** for enhanced functionality
- **Role-Based Navigation** and access control

## 📋 Milestones Completed

### ✅ Milestone 1: Basic App Structure
- [x] Login page with form validation
- [x] User list page with table format
- [x] Posts list page with filtering
- [x] Post details page with full information
- [x] Custom date formatting pipe (dd/mm/yyyy)
- [x] Custom role-based directive for conditional rendering

### ✅ Milestone 2: Role-Based Access and CRUD Operations
- [x] Role-based login (Admin/User)
- [x] Admin can view, add, and delete users
- [x] Users can create posts and filter (All/My posts)
- [x] Delete functionality for both users and posts

### ✅ Milestone 3: Profile Management
- [x] Profile page showing user details
- [x] Edit profile functionality with template-driven forms
- [x] All user fields editable (name, email, phone, age, DOB, gender)
- [x] In-memory state management

### 🔄 Milestone 4: API Integration (Ready for Implementation)
- [x] Structure ready for dummyjson.com integration
- [x] Token-based authentication system
- [x] Route guards for protected pages

## 🛠️ Technology Stack

- **Angular 19** - Latest version with standalone components
- **TypeScript** - Type-safe development
- **CSS3** - Modern styling with responsive design
- **HTML5** - Semantic markup
- **RxJS** - Reactive programming patterns

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/           # Login component with form
│   │   ├── users/           # User management (Admin only)
│   │   ├── posts/           # Posts listing and creation
│   │   ├── post-details/    # Individual post view
│   │   └── profile/         # User profile management
│   ├── models/
│   │   ├── user.model.ts    # User interface
│   │   └── post.model.ts    # Post interface
│   ├── services/
│   │   ├── auth.service.ts  # Authentication & user management
│   │   └── post.service.ts  # Post CRUD operations
│   ├── pipes/
│   │   └── date-format.pipe.ts  # Custom date formatting
│   ├── directives/
│   │   └── role.directive.ts     # Role-based conditional rendering
│   ├── app.component.*      # Main app component
│   ├── app.routes.ts        # Routing configuration
│   └── app.config.ts        # App configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI 19

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 👥 Demo Credentials

### Admin User
- **Email:** alice.johnson@example.com
- **Password:** admin123
- **Access:** All features (Users, Posts, Profile)

### Regular Users
- **Email:** bob.smith@example.com
- **Password:** user123
- **Access:** Posts and Profile only

- **Email:** carol.williams@example.com
- **Password:** user456
- **Access:** Posts and Profile only

## 🎯 Features

### Authentication & Authorization
- Secure login with email/password
- Role-based access control (Admin/User)
- Session management with localStorage
- Protected routes with automatic redirects

### User Management (Admin Only)
- View all users in table format
- Delete users with confirmation
- User statistics dashboard
- Role-based badges and styling

### Post Management
- Create new posts (User role)
- View all posts or filter by "My Posts"
- Post details with author information
- Delete own posts
- Custom date formatting (dd/mm/yyyy)

### Profile Management
- View complete user profile
- Edit all profile fields
- Template-driven forms with validation
- Real-time form validation
- Cancel/Save functionality

### UI/UX Features
- Modern, responsive design
- Smooth animations and transitions
- Mobile-friendly layout
- Loading states and error handling
- Intuitive navigation

## 🔧 Custom Components

### Date Format Pipe
```typescript
// Transforms ISO date to dd/mm/yyyy format
{{ post.createdAt | dateFormat }}
```

### Role Directive
```html
<!-- Shows content only for admin users -->
<div *appRole="'admin'">Admin only content</div>
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎨 Styling Features

- **Modern Design:** Clean, professional appearance
- **Color Scheme:** Purple gradient theme with proper contrast
- **Typography:** Clear, readable fonts
- **Spacing:** Consistent padding and margins
- **Shadows:** Subtle depth and elevation
- **Hover Effects:** Interactive feedback

## 🔒 Security Features

- Route protection for authenticated users
- Role-based component rendering
- Form validation and sanitization
- Secure logout functionality

## 📊 Data Management

- In-memory data storage (Milestones 1-3)
- Mock data with realistic structure
- Auto-incrementing IDs for new entries
- Real-time updates without page refresh

## 🚀 Future Enhancements (Milestone 4)

- API integration with dummyjson.com
- Real backend authentication
- Persistent data storage
- Enhanced error handling
- Loading states for API calls

## 🧪 Testing

The application is ready for testing with:
- Unit tests for components
- Service testing
- Pipe and directive testing
- E2E testing capabilities

## 📝 Code Quality

- **TypeScript:** Strict typing throughout
- **ESLint:** Code quality enforcement
- **Prettier:** Consistent formatting
- **Angular Style Guide:** Best practices followed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of the Angular assessment.

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Angular CLI for the development tools
- Modern CSS techniques for styling
- Responsive design principles

---

**Built with ❤️ using Angular 19**

---

# 🔄 Application Control Flow

## 📊 High-Level Control Flow Diagram

```
┌─────────────────┐
│   Application   │
│     Startup     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   App Component │
│   Initialization│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Auth Service   │
│   Constructor   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Check localStorage│
│  for User Data  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Router Guard  │
│   Check Auth    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Route to      │
│  Login/Home     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  User Interface │
│   Navigation    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Component      │
│  Lifecycle      │
└─────────────────┘
```

## 🔄 Detailed Control Flow Breakdown

### 1. Application Startup Flow

```
1. Browser loads application
   ↓
2. main.ts executes and bootstraps Angular
   ↓
3. App Component loads and initializes
   ↓
4. AuthService constructor runs
   ↓
5. Check localStorage for existing user session
   ↓
6. If user exists → Set current user in BehaviorSubject
   ↓
7. If no user → Set current user as null
   ↓
8. App Component renders with navigation
   ↓
9. Router checks current route
   ↓
10. If user authenticated → Route to appropriate page
   ↓
11. If not authenticated → Route to login page
```

### 2. Authentication Flow

```
1. User enters email and password
   ↓
2. Login form validation runs
   ↓
3. If validation fails → Show field errors
   ↓
4. If validation passes → Show loading state
   ↓
5. AuthService.login(email, password) called
   ↓
6. Check credentials against mock user data
   ↓
7. If invalid credentials → Return false
   ↓
8. If valid credentials → Return true and user object
   ↓
9. If login successful:
    - Set current user in BehaviorSubject
    - Save user data to localStorage
    - Check user role (admin/user)
    - Navigate based on role:
      * Admin → /users
      * User → /posts
   ↓
10. If login failed → Show error message
```

### 3. Navigation Flow

```
1. User clicks navigation link
   ↓
2. Angular Router processes route change
   ↓
3. Check if route is protected
   ↓
4. If not protected → Load component directly
   ↓
5. If protected → Check user authentication
   ↓
6. If not authenticated → Redirect to /login
   ↓
7. If authenticated → Check user role permissions
   ↓
8. If wrong role → Redirect to appropriate page
   ↓
9. If correct role → Load component
   ↓
10. Component ngOnInit runs
   ↓
11. Load data from service
   ↓
12. Render template with data
```

### 4. Component Lifecycle Flow

```
1. Component instantiated by Angular
   ↓
2. Constructor runs with dependency injection
   ↓
3. ngOnInit lifecycle hook executes
   ↓
4. Check user authentication status
   ↓
5. If not authenticated → Redirect to login
   ↓
6. If authenticated → Load component data
   ↓
7. Call service methods to get data
   ↓
8. Update component properties
   ↓
9. Template renders with data
   ↓
10. User interacts with component
   ↓
11. Event handlers process user actions
   ↓
12. Service methods called for data updates
   ↓
13. Component state updated
   ↓
14. Template re-renders with new data
```

### 5. Data Flow Architecture

```
Component → Service → In-Memory Data → Component State → Template Rendering → User Interface
    ↑                                                                                    ↓
    └────────────────────── User Actions ←──────────────────────────────────────────────┘
```

## 🔄 Specific Feature Control Flows

### 1. Login Process Flow

```
1. User visits application
   ↓
2. App checks localStorage for existing session
   ↓
3. If no session → Show login form
   ↓
4. User enters email/password
   ↓
5. Form validation (required fields, email format)
   ↓
6. If validation fails → Show error messages
   ↓
7. If validation passes → Show loading state
   ↓
8. AuthService.login(email, password)
   ↓
9. Check credentials against mock data
   ↓
10. If invalid → Show "Invalid credentials" error
   ↓
11. If valid → Set current user in BehaviorSubject
   ↓
12. Save user data to localStorage
   ↓
13. Check user role (admin/user)
   ↓
14. Navigate based on role:
    - Admin → /users
    - User → /posts
```

### 2. User Management Flow (Admin Only)

```
1. Admin navigates to /users
   ↓
2. Component ngOnInit checks authentication
   ↓
3. If not authenticated → Redirect to login
   ↓
4. If authenticated but not admin → Redirect to login
   ↓
5. If admin → Load users from AuthService
   ↓
6. Display users in table format
   ↓
7. Admin can view user details
   ↓
8. Admin clicks "Delete User"
   ↓
9. Show confirmation dialog
   ↓
10. If confirmed → Call AuthService.deleteUser()
   ↓
11. Remove user from in-memory data
   ↓
12. Refresh user list
   ↓
13. Update statistics (admin count, user count)
```

### 3. Post Management Flow

```
1. User navigates to /posts
   ↓
2. Component checks authentication
   ↓
3. Load all posts from PostService
   ↓
4. Display posts in grid layout
   ↓
5. User can filter posts:
   - "All Posts" → Show all posts
   - "My Posts" → Show only user's posts
   ↓
6. User clicks "Create Post"
   ↓
7. Show create post form
   ↓
8. User fills form (title, content)
   ↓
9. Form validation
   ↓
10. User clicks "Create Post"
   ↓
11. PostService.createPost()
   ↓
12. Generate new ID and timestamp
   ↓
13. Add post to in-memory data
   ↓
14. Hide form and refresh post list
   ↓
15. User can view post details
   ↓
16. User can delete own posts
   ↓
17. Confirmation → Delete from data
```

### 4. Profile Management Flow

```
1. User navigates to /profile
   ↓
2. Component loads current user data
   ↓
3. Display user information in read-only mode
   ↓
4. User clicks "Edit Profile"
   ↓
5. Switch to edit mode
   ↓
6. Populate form with current data
   ↓
7. User modifies fields
   ↓
8. Real-time form validation
   ↓
9. User clicks "Save Changes"
   ↓
10. If form invalid → Show validation errors
   ↓
11. If form valid → AuthService.updateUser()
   ↓
12. Update in-memory user data
   ↓
13. Update current user in BehaviorSubject
   ↓
14. Update localStorage
   ↓
15. Show success message
   ↓
16. Switch back to view mode
   ↓
17. User clicks "Cancel"
   ↓
18. Restore original data
   ↓
19. Switch back to view mode
```

## 🔄 State Management Flow

### 1. User State Flow

```
┌─────────────────┐
│   Initial State │
│   (No User)     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Login Success │
│   (User Set)    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Navigation     │
│  (Role-Based)   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   User Actions  │
│   (CRUD Ops)    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Logout        │
│   (Clear State) │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Return to     │
│   Initial State │
└─────────────────┘
```

### 2. Data State Flow

```
┌─────────────────┐
│   Service Data  │
│   (In-Memory)   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Component     │
│   Request Data  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Service       │
│   Return Data   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Component     │
│   Update State  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Template      │
│   Re-render     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   User Sees     │
│   Updated UI    │
└─────────────────┘
```

## 🔄 Error Handling Flow

### 1. Authentication Errors

```
1. Invalid credentials entered
   ↓
2. AuthService.login() returns false
   ↓
3. Component sets errorMessage
   ↓
4. Template displays error message
   ↓
5. User can retry login
```

### 2. Navigation Errors

```
1. User tries to access protected route
   ↓
2. Component checks authentication
   ↓
3. If not authenticated → Redirect to login
   ↓
4. If wrong role → Redirect to appropriate page
   ↓
5. Show appropriate error message
```

### 3. Form Validation Errors

```
1. User submits invalid form
   ↓
2. Angular form validation runs
   ↓
3. If validation fails → Show field errors
   ↓
4. Disable submit button
   ↓
5. User corrects errors
   ↓
6. Real-time validation updates
   ↓
7. Form becomes valid
   ↓
8. Enable submit button
```

## 🔄 Performance Flow

### 1. Component Loading

```
1. Route change triggered
   ↓
2. Angular router loads component
   ↓
3. Component constructor runs
   ↓
4. Dependency injection completes
   ↓
5. ngOnInit lifecycle hook
   ↓
6. Authentication check
   ↓
7. Data loading from service
   ↓
8. Template rendering
   ↓
9. User interface ready
```

### 2. Data Updates

```
1. User performs action
   ↓
2. Event handler triggered
   ↓
3. Service method called
   ↓
4. In-memory data updated
   ↓
5. Component state updated
   ↓
6. Change detection runs
   ↓
7. Template re-renders
   ↓
8. UI reflects changes
```

## 🔄 Security Flow

### 1. Route Protection

```
1. User navigates to protected route
   ↓
2. Component ngOnInit runs
   ↓
3. Check if user is authenticated
   ↓
4. If not authenticated → Redirect to login
   ↓
5. If authenticated → Check user role
   ↓
6. If wrong role → Redirect to appropriate page
   ↓
7. If correct role → Load component
```

### 2. Action Authorization

```
1. User attempts action (delete, edit, etc.)
   ↓
2. Component checks user permissions
   ↓
3. If not authorized → Hide/disable action
   ↓
4. If authorized → Allow action
   ↓
5. Perform action with confirmation
   ↓
6. Update data securely
```

This comprehensive control flow documentation shows exactly how the application works from startup to user interactions, making it easy to understand the complete flow of the Angular assessment project.
