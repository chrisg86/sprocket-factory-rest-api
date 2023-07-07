# Sprocket and factory API

This is a REST API for handling Sprocket and Factory data.

## Getting started

### Set up required configuration

#### Clone the repository

```
git clone https://github.com/chrisg86/sprocket-factory-rest-api.git
```

#### Install dependencies

```
npm install
```

#### Create env file

Create an `.env` file and set settings accordingly

```
cp .env.example .env
```

### Running

#### Stand up database

All relevant configuration can be found inside `docker-compose.yml`. As I am using docker-compose, you need to make sure that the docker daemon is running before running this command.

```
docker-compose -f docker-compose.yml up
```

#### Seeding the database

In case you want example data in the database, you can run `import_data.sh` in the project root. This script relies on two files in the `/data` folder, which will both be imported:

- seed_factory_data.sql
- seed_sprocket_types.sql

#### Run the dev server

You might need to run `tsc` once in order to build the entrypoint for node before running the dev command.

(once)

```
tsc
```

(when you have the build dir up and running)

```
npm run dev
```

By default the server will spin up on localhost with the PORT you provided in your `.env` file (default 8000 [https://localhost:8000](https://localhost:8000))

## Usage

By default the API will spin up on [https://localhost:8000](https://localhost:8000).

### Postman collection

I've included `PowerFlex.postman_collection.json` which you can import into Postman.

### API documentation

Complete openapi spec can be found in the `openapi` root folder.

Note: I had conflicts between the spec definition and the online editor ([https://editor-next.swagger.io/](https://editor-next.swagger.io/)) for array types, so I included both versions in that folder

### Running the tests

For running the unit tests, you can just use `npm run test`

For running integration tests, you need to spin up cypress using `npm run cypress:open`.

Next choose the following on the page that starts up:

1. E2E Testing
1. Chrome and Start E2E Testing in Chrome
1. Click the e2e test suite you want to run

### Linting

Run code lint via `npm run lint`

## Building

Files get converted to javascript and stored in the `build` root folder of the project.
