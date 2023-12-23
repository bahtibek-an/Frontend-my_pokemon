# Pokebag APP

Web Based Single Page Application of Pokemon Library to catch and safe it to your own bag.

Demo available at: [https://pokebag.vercel.app](https://pokebag.vercel.app)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you already have yarn or npm installed on your machine. If not, please take a look at this link below.

[https://classic.yarnpkg.com/en/docs/install](https://classic.yarnpkg.com/en/docs/install)

### Installing

After that, install required dependencies by executing this command on terminal

```
yarn install
# or
npm install
```

After instalation success, run command below to make your code available in development mode.

```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to see the website

## Development

We are using git flow for development purpose. Please use this prefix for branches on spesific use case of development

### 1. feature/branch_name
Checkout from branch `develop` and create `feature/branch_name` for creating new feature.

### 2. hotfix/branch_name
Checkout from branch `master` and create `hotfix/branch_name` for creating hotfix or immediate fix on production.

## Running on production
Kindly use this command to build app for production and serve it.

```
yarn build && yarn start
```

Open [http://localhost:3000](http://localhost:3000) to see the website

## Testing
This project contain unit testing and integration testing. All the test files have *.test.js name.
To launch test runner in interactive watch mode for current uncommit codes, run

```
yarn test
```
To watch all test and see coverage run

```
yarn test --coverage --watchAll
```

## Deployment

For this project we are using [Vercel](https://vercel.com/) because it is easy and support Create React App project.
It has built in CI/CD to detect changes/merge on default branch to create new build.

## Built With
* [Poke GQL API](https://github.com/mazipan/graphql-pokeapi) - The Pokemon Graphql API
* [Create React App](https://github.com/facebook/create-react-app) - The web framework used
* [Emotion](https://emotion.sh) CSS in JS library
* [Apollo Client](https://github.com/apollographql/apollo-client) GQL Client
* [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): To store the catched Pokemon
* [React Testing Library](https://github.com/testing-library/react-testing-library): Unit and Integration Test Library

## Authors

* **Faiz Azmi Rekatama** - *Initial work* - [faizrktm](https://github.com/faizrktm)
