# DDN QA Technical Test

## Overview

API testing and automation for authentication endpoint.

## Technology Stack

- Language: TypeScript / JavaScript
- API Automation: Playwright
- API Client: Postman
- CLI API Runner: Newman
- Mock Server: Node.js + Express
- Package Manager: npm
- Test Architecture: Page Object Model (POM)

### Versions

- Node.js: v24.4.1
- npm: 11.4.2
- Playwright: 1.62.1
- Newman: ^6.2.2
- Express: @5.2.1

## Prerequisites

The following software is required:

- Node.js
- npm
- Git

All project dependencies are defined in `package.json` and can be installed using:
```bash
npm install
```

## Base URL

The original API base URL was not provided in the technical test.

Therefore, a local mock server using Node.js and Express is provided for testing purposes.

Default base URL:
```bash
[npm install](http://localhost:3000)
```

Login endpoint:
```bash
POST /api/v1/auth/login
```
Full endpoint:
```bash
[POST /api/v1/auth/login](http://localhost:3000/api/v1/auth/login)
```

The mock server simulates the expected API behavior for both positive
and negative login scenarios.

## Installation

Clone the repository:
```bash
git clone https://github.com/verginl/ddn-qa-technicaltest.git
```

Navigate to the project:
```bash
cd ddn-qa-technicaltest
```

Install dependencies:
```bash
npm install
```

## Run Mock Server

Start the local mock server:

```bash
npm run mock
```

## Run Playwright API Automation

Run all API automation tests:

```bash
npx playwright test
```

Open the report:

```bash
npx playwright show-report
```

## Run Newman

The Postman collection can be executed using Newman.

```bash
npm run test:newman
```
Newman execution evidence is available in:

reports/newman-report.html

## Recommended Execution Flow

Follow the steps below to install dependencies, start the mock server, and execute the API automation.

### 1. Clone the Repository

```bash
git clone https://github.com/verginl/ddn-qa-technicaltest.git
cd ddn-qa-technicaltest
```

2. Install Dependencies

Install all required project dependencies:
```bash
npm install
```

3. Start the Mock Server

Start the local mock API server:
```bash
npm run mock
```

The mock server will run on:
```bash
[npm run mock](http://localhost:3000)
```
Keep the mock server running during the test execution.


4. Run Playwright API Automation

Open a new terminal and run:
```bash
npx playwright test
```

5. View Playwright HTML Report

After the Playwright test execution is completed:
```bash
npx playwright show-report
```

The HTML report will be available in:
```bash
playwright-report/
```

6. Run Postman Collection Using Newman

Run the Postman collection with the configured environment:
```bash
npm run test:newman
```

The command executes:

postman/VERGI - DDN QA TECHNICAL TEST.postman_collection.json

using:

postman/Dev - Vergi DDN QA Technical Test.postman_environment.json

7. View Newman Execution Report

The Newman HTML report is available at:
```bash
reports/newman-report.html
```

