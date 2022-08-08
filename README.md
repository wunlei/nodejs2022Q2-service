# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/get-started/)

## Usage

### Downloading

1. Clone repository

```
git clone https://github.com/wunlei/nodejs2022Q2-service.git
```

2. Go to project folder and checkout to dev branch:

```
  cd nodejs2022Q2-service
  git checkout logger
```

### Installing NPM modules

```
npm install
```

### Running application

1. Copy and rename `.env.example` to `.env`. If needed apply changes in `.env` file

2. Run app:

```
docker-compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/

### Log Levels

LOG_FILE_SIZE in `.env` in kB

- 0 - `error`
- 1 - `warn`
- 2 - `log`
- 3 - `debug`
- 4 - `verbose`

## Docker Scan

```
npm run docker:scan:server
```

```
npm run docker:scan:db
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
