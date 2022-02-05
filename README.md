# React Native Starter

Ronas IT template for React Native + Expo projects.

## What's included

- Build and submit configuration templates
- Feature-oriented project structure
- Code linting and formatting using ESlint & Prettier (with pre-commit auto-formatting)
- Testing environment setup with simple tests examples
- SVG setup
- Common modules and basic components for a quick start

\+ Demo app that interacts with some open API.

## Usage

1. Make sure you have [Expo CLI](https://docs.expo.io/workflow/expo-cli/) installed.
2. Init your project:

```sh

expo init your-app-name --npm -t @ronas-it/react-native-starter@latest

```

3. Follow `TODO`s in the code to update app configuration and clean up demo code.

## Useful scripts

See `package.json` for pre-defined scripts. You can run them using `npm run {script}` or `yarn {script}`:

- Run using Expo: `start`
- Lint code: `lint`
- Format code: `format`
- Run tests: `test`
- Build for Android: `build:android:{environment}`
- Build for iOS: `build:ios:{environment}`
- Submit iOS build to AppStore Connect: `submit:ios:{environment}`
- Publish OTA-update: `publish:{environment}`

## Demo app

This project includes a demo application that simulates login and displays some demo users list.
Data is populated from [Go Rest](https://gorest.co.in/) Open API.

1. Run the project using `start` script.
1. Open the app using [Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and) or [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)/[iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/).
1. Use any valid email and non-empty password for login into demo app.
