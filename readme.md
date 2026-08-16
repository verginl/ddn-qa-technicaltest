# DDN QA Technical Test

## Overview

API testing and automation for authentication endpoint.

## Prerequisites

- Node.js 18+
- npm
- Postman (optional)
- Git

## Setup

git clone <repository-url>

cd ddn-qa-technicaltest

npm install

## Start Mock Server

npm run mock

Base URL:
http://localhost:3000

## Option A - Postman / Newman

npm run test:newman

Generate HTML report:

npm run test:newman:report

## Option B - Playwright

npx playwright test

View report:

npx playwright show-report

## Documentation

- Test Strategy → docs/test-strategy.md
- Test Scenario → docs/test-scenarios.xlsx
- Authentication & Authorization → docs/authentication-authorization.md
- SQL Validation → docs/sql-validation.md

## Assumptions

The original API base URL was not provided.
Therefore, a local Express mock server is used.

No production credentials, access tokens,
or production data are included.