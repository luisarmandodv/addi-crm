# React Native Expo - Client Relationship Management (CRM) - FrontEnd

<img width="400" alt="image" src="https://github.com/luisarmandodv/addi-crm/assets/23444805/4129abcb-cd71-4ee0-b33b-f5d7a053c04c">
<img width="400" alt="image" src="https://github.com/luisarmandodv/addi-crm/assets/23444805/6627cfcf-91cf-4859-9d95-a6b7b54bca4f">
<img width="400" alt="image" src="https://github.com/luisarmandodv/addi-crm/assets/23444805/c901dfd2-4a7d-4cec-b6c5-f4df1fe210ad">
<img width="400" alt="image" src="https://github.com/luisarmandodv/addi-crm/assets/23444805/4a378c7f-42ea-4de7-8404-1a4f1d3074ea">


React Native CRM with [Expo framework](https://expo.dev/).

## Run project in development mode

- Download the project.

- Install dependencies: `npm install` or `yarn install`.

### Options for running the app

- Run server: `npm start` or `yarn start`. Then use app **Expo Go** on your iOS or Android mobile and scan QR code on the terminal. **Expo Go** can be downloaded for free from the App Store (iOS) and from Google Play (Android).

- Run on Android: `npm run android` or `yarn android`. _For running on an Android simulator, install [Android Studio](https://developer.android.com/studio)._

- Run on iOS: `npm run ios` or `yarn ios`. _For running on an iOS simulator, install [XCode](https://www.freecodecamp.org/news/how-to-download-and-install-xcode/)_

## Libraries

In this app, I am using the following libraries:

- [React Native](https://www.npmjs.com/package/react-native). This library is used to create an app that can run on both iOS and Android devices. It allows us to build native apps using JavaScript and React.
- [Expo](https://expo.dev/). This framework provides tools for testing and deploying the app in a web environment. It simplifies the development process by allowing us to build and test our app quickly and easily.
- [Async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage). This library provides a way to store data in the device's local storage. It is used to save user data locally, which can be retrieved and used in the app even when the user is offline.
- [Zustand](https://zustand-demo.pmnd.rs/). A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.
- [react-navigation/stack](https://www.npmjs.com/package/@react-navigation/stack). For allowing a navigation system between screens.
- [react-query](https://tanstack.com/query/v3/). Toss out that granular state management, manual refetching and endless bowls of async-spaghetti code. React Query gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both your developer and user experiences.

## Database

Since this is a front-end only app, there is no backend. In this app, the fetch calls are simulated and the data is stored locally on the device and for signing in, it is used DummyJSON which is a "Get dummy/fake JSON data to use as placeholder in development or in prototype testing". 
The fetch calls in this app are managed using Axios and react-query, which make it easy to handle asynchronous operations. To use a real fetch API instead of the simulated data, it's easy to modify the files to make network requests.


## Features

- The user can sign in by using the default user
- The user can add new leads using the modal opened by the right header button.
- The user can convert the lead into a prospect if the requirements match

## Todos

