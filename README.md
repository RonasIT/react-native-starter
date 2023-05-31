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

Init your project:

```sh
npx create-expo-app -t @ronas-it/react-native-starter
```

Follow `TODO`s in a generated project to update your app configuration and clean up demo code.

## Useful scripts

See `package.json` for pre-defined scripts. You can run them using `npm run {script}` or `yarn {script}`:

- `start` - Start local `development`-env server to develop with [Expo Go](https://docs.expo.dev/get-started/expo-go/)
  - Run server locally for other environments: `start:{environment}`
  - To develop with [Development client](https://docs.expo.dev/develop/development-builds/introduction/) start server with `--dev-client` flag
- `lint` - Lint code
- `format` - Run code autoformat
- `test` - Run tests
- `verify` - Run necessary code checks
  - `verify:ts` - verify Typescript compilation
  - `verify:cycles` - run circular dependencies check
- `build:{environment}` - Create builds for _both_ platforms
  - Pass `-p {android|ios}` to run a platform-specific build
  - To create a [Development client](https://docs.expo.dev/develop/development-builds/introduction/) build run `build:debug`
- `submit:ios:{environment}` - Submit iOS build to AppStore Connect
- `update:{environment}` - Publish OTA-update

## Demo app

This project includes a demo application that simulates login and displays some demo users list.
Data is populated from [Go Rest](https://gorest.co.in/) Open API.

1. Run the project using `start` script.
1. Open the app using [Expo Go](https://docs.expo.dev/get-started/expo-go/) or [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)/[iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/).
1. Use any valid email and non-empty password for login into demo app.
