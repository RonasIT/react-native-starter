# React Native Starter

Ronas IT template for React Native + Expo projects.

## What's included

- Build and submit configuration templates
- Feature-oriented project structure
- Code linting and formatting using ESlint & Prettier (with pre-commit auto-formatting)
- Testing environment setup with simple tests examples
- SVG setup
- Common modules and basic components for a quick start
- Redux setup and entities CRUD implementation using [RTK](https://redux-toolkit.js.org/) **[Work-in-progress]**

\+ Demo app that interacts with some open API.

## Usage

1. Make sure you have [Expo CLI](https://docs.expo.io/workflow/expo-cli/) installed.
2. Init your project:

   ```sh
   npx create-expo-app -t @ronas-it/react-native-starter
   ```

3. Follow `TODO`s in generated project to update app configuration and clean up demo code.

## Useful scripts

See `package.json` for pre-defined scripts. You can run them using `npm run {script}` or `yarn {script}`:

- Start local `development`-env version using Expo: `start`.
- Run locally for other environments: `start:{environment}`.
- Lint code: `lint`.
- Format code: `format`.
- Run tests: `test`.
- Run necessary code checks: `verify`. Run `verify:ts` to verify Typescript, and `verify:cycles`
  for circular dependencies check.
- Run builds for _both_ platforms: `build:{environment}`. Pass `-p {android|ios}` to run a platform-specific build.
- Submit iOS build to AppStore Connect: `submit:ios:{environment}`.
- Publish OTA-update: `update:{environment}`.

## Demo app

This project includes a demo application that simulates login and displays some demo users list.
Data is populated from [Go Rest](https://gorest.co.in/) Open API.

1. Run the project using `start` script.
1. Open the app using [Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and) or [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)/[iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/).
1. Use any valid email and non-empty password for login into demo app.
