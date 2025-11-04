# Library App

A minimal, ready-to-run React + Vite + Tailwind + Firebase application for managing your personal library of books, movies, and other items.

## Features

- Add items (books/movies/objects) with details like title, author, pages, ratings
- Upload cover images for items
- Track reading progress (pages read and percentage)
- Rate items with half-star precision (0-5 stars)
- Multiple viewing modes: Grid, Messy Grid, and Stack
- Filter by status: All, Read, Want to Read
- Dashboard with yearly reading goal tracking
- Total read counter

## Project Structure

```
library-app/
├── src/
│   ├── components/
│   │   ├── AddItemModal.jsx    # Modal for adding new items
│   │   ├── BookCard.jsx         # Card component for displaying items
│   │   ├── Dashboard.jsx        # Dashboard with stats and goals
│   │   └── ViewToggle.jsx       # Toggle between view modes
│   ├── styles/
│   │   └── index.css           # Global styles with Tailwind
│   ├── App.jsx                 # Main app component
│   ├── firebase.js             # Firebase configuration
│   └── main.jsx                # App entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── postcss.config.cjs
```

## Setup Instructions

### 1. Firebase Configuration

Before running the app, you need to set up Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in test mode (or production mode with proper security rules)
4. Enable **Storage**:
   - Go to Storage
   - Click "Get started"
   - Use default security rules or customize as needed
5. Get your Firebase configuration:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click on the web app icon or "Add app" if you haven't created one
   - Copy the configuration object

6. Update `src/firebase.js` with your configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
}
```

### 2. Install Dependencies

Dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

### Adding Items

1. Click the "Add" button in the header
2. Fill in the item details:
   - Type (Book, Movie, or Object)
   - Title (required)
   - Author/Creator
   - Total pages
   - Pages read
   - Status (Want to read / Read)
   - Rating (0-5, halves allowed)
   - Year logged
   - Cover image (optional)
3. Click "Save"

### Tracking Progress

- Enter pages read in the input field on each card
- Click "Save" to update progress
- The percentage will automatically calculate

### Rating Items

- Click on the stars to rate items
- Ratings support half-stars (0.5 increments)

### View Modes

- **Grid**: Clean, organized grid layout
- **Messy**: Slightly rotated cards for a casual look
- **Stack**: Random scattered layout

### Filtering

Use the filter buttons to view:
- **All**: All items in your library
- **Read**: Only items you've finished
- **Want to Read**: Items on your reading list

### Dashboard

- View total items read
- Set and track your yearly reading goal
- See progress toward your goal

## Future Enhancements

Potential features to add:
- Camera capture for adding book covers directly
- Google Books API integration for automatic book details
- User authentication for private libraries
- Search and sort functionality
- Notes and reviews for each item
- Export data functionality
- Offline support with service workers

## Technologies Used

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Firebase 10** - Backend (Firestore + Storage)
- **react-hook-form** - Form management
- **react-star-ratings** - Star rating component
- **react-icons** - Icon library

## Notes

- This is a starter template - customize it to fit your needs
- The stack view uses random positioning on each render
- Firestore security rules should be configured for production use
- Consider implementing authentication for multi-user scenarios

## License

This project is provided as-is for personal use.
