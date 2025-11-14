# angular-pkce-login

**Requires** the [keycloak-resource](http://github.com/tcarr-icloud/keycloak-resource) service.

## Overview
This project is a modern Angular 20 application that provides secure authentication using the PKCE authorization flow. It leverages the `angular-auth-oidc-client` library to handle OAuth 2.0 and OpenID Connect authentication protocols.

## Tech Stack

- **Framework**: Angular 20.3.0
- **Language**: TypeScript 5.9.2
- **UI Libraries**: 
  - Angular Material 20.2.9
  - Material-UI (MUI) 7.3.4
  - Emotion (CSS-in-JS)
- **Authentication**: angular-auth-oidc-client 20.0.2
- **State Management**: RxJS 7.8.0
- **Testing**: Karma + Jasmine

## Prerequisites

- Node.js (LTS version recommended)
- npm package manager

## Available Scripts

- **`npm start`** - Start the development server
- **`npm run build`** - Build the project for production
- **`npm run watch`** - Build in watch mode with development configuration
- **`npm test`** - Run unit tests with Karma

## Development Server

Run `npm start` to start the development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Testing

Run `npm test` to execute the unit tests via Karma test runner.

## Code Style

This project uses Prettier for code formatting with the following configuration:
- Print width: 100 characters
- Single quotes enabled
- Angular parser for HTML files

## Security

This application implements the PKCE (Proof Key for Code Exchange) flow, which is the recommended OAuth 2.0 authorization flow for single-page applications (SPAs). PKCE provides enhanced security by preventing authorization code interception attacks.

## License

Private

---

For more information about Angular, visit the [Angular documentation](https://angular.dev/).
