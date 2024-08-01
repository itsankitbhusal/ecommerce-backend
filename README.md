## Description

Ecommerce store **REST API** in Nest js

## Installation

Make sure you already have installed **Node js** (>v18 recommended).

If you don't have pnpm you can use **npm** too just replace `pnpm` with `npm`

```bash
pnpm install
```

## Generate the prisma models

```bash
# npx prisma generate (using npm)
pnpm prisma generate
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```
<!-- # # production mode -->
<!-- # $ pnpm run start:prod -->
<!-- ``` -->

## You can find api documentation in swagger 
`http://localhost:3000/api`


## Make sure to setup `.env` variables

- **DATABASE_URL** -> prisma connection url 
  - eg: `postgresql://<username>:<password>@<host>:<port>/<db_name>`
- **AT_SECRET** -> access token secret
- **RT_SECRET** -> refresh token secret
- **MAIL_HOST** -> host address of email service provider
- **MAIL_PORT** -> port of email service provider
- **MAIL_ID** -> default email id from which you want to send email
- **MAIL_PASS** -> password of email
- **COMPANY_LOGO** -> logo to attach along with email
- **APP_NAME** -> application name to appear in email
- **NODE_ENV** -> separate `"dev" || "prod"` env


<!-- ## Test (skip this)

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
``` -->
