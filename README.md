# AI TripPlanner

**AI TripPlanner** is a mobile application built to generate detailed travel plans using AI-driven insights. The app allows users to search for destinations, specify their travel dates, choose a traveler type and budget, and then uses Google's Generative AI to generate an itinerary. Users can authenticate using Firebase and view, review, and save planned trips.

## Tech Stack

- **React Native** with [Expo](https://expo.dev)  
  Provides the core framework for building cross-platform mobile apps.

- **Expo Router**  
  Implements file-based navigation (see [app/_layout.jsx](app/_layout.jsx)).

- **Firebase**  
  - **Firebase Auth:** For user authentication ([configs/Firebase_Config.js](configs/Firebase_Config.js))
  - **Firebase Firestore:** To store and retrieve trip data.

- **Google Generative AI API**  
  Used to build and process detailed travel itineraries based on custom prompts ([configs/AIModel.js](configs/AIModel.js)).

- **Expo Font**  
  For loading and using custom fonts (see [assets/fonts](assets/fonts) and [app/(tabs)/_layout.jsx](app/(tabs)/_layout.jsx)).

- **Other Dependencies:**  
  - **moment:** For date formatting and manipulation.
  - **react-native-calendar-picker:** For selecting travel dates ([app/Create_trip/SelectDate.jsx](app/Create_trip/SelectDate.jsx)).
  - **react-native-google-places-autocomplete:** For searching places ([app/Create_trip/SearchPlace.jsx](app/Create_trip/SearchPlace.jsx)).
  - **Various Expo packages:** For icons, status-bar, linear gradients, etc.

## Project Structure

- **app/** – Contains the main screens and navigation:
  - Authentication screens in `app/auth`
  - Trip creation flow in `app/Create_trip`
  - Tabbed screens under `app/(tabs)`
  
- **components/** – Reusable UI components (e.g. `Login.jsx`, `UserTripCard.jsx`).

- **configs/** – Configuration files for Firebase and the AI model.

- **constants/** – Application constants such as color themes and options.

- **context/** – React contexts used to share state (e.g. `createTripContext.js`).

- **scripts/** – Utility scripts (e.g. `reset-project.js`).

## Getting Started

1. **Install Dependencies**

   ```sh
   npm install
   ```

2. **Start the App**

   ```sh
   npx expo start
   ```

Follow the in-terminal instructions to open the app in an emulator or on your device.

## Additional Information

- Custom fonts are loaded via `expo-font` and used across the app.
- Detailed trip planning is powered by a pre-defined AI prompt stored in [constants/options.js](constants/options.js).
- The app uses Firebase for both authentication and data storage (trip plans).

Happy coding!