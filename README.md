# BudgetFree

This work in progress project will meet the need for a free and open-source personal budgeting software which is accessible from any device.

## Local Install for Developers

1. Install [npm](https://www.npmjs.com/), [yarn](https://classic.yarnpkg.com/), and [postgreSQL](https://www.postgresql.org/) on your local machine.

2. Clone this repo: `git clone https://github.com/bclewi5555/budget-free.git`

3. Start up an empty PosgreSQL database named `budgetfree` from the default user (`postgres`) on the default port (`5432`)

## Run Development Server

1. Navigate to the server directory

2. Create a new environment config file named `.env` with the contents below, replacing `secretpassword` and `secretsession` with your actual database user password and session secret.
```
PORT=3001

PGPORT=5432
PGHOST=localhost
PGUSER=postgres
PGDATABASE=budgetfree
PGPASSWORD=secretpassword

SESSION_SECRET=secretsession
```

3. Run: `npm run start`

## Run Development Client

1. Navigate to the client directory in a new terminal

2. Run: `yarn start`

## Server API Reference

### Signup
`POST` `http://localhost:3001/api/v1/auth/signup`
#### Request Body (JSON)
```
{
    "email": "aa1@example.com",
    "password": "password",
    "username": "AlexaAllistair1",
    "firstName": "Alexa",
    "lastName": "Allistair"
}
```
#### Example Response `200 OK`
```
{
    "id": "26ef6595-7d14-402f-a616-e1f514b408c7",
    "email": "aa1@example.com",
    "passwordHash":
"$2b$10$Zx4Xe6sPRq2W1jwGR2eFSefNkGKbza2dRFjMpOrFx1wm2X5oj5WCm",
    "username": "AlexaAllistair1",
    "firstName": "Alexa",
    "lastName": "Allistair",
    "updatedAt": "2021-02-24T03:12:17.140Z",
    "createdAt": "2021-02-24T03:12:17.140Z"
}
```

See `server > controller > auth.js` for details

## Project Description

This project will be a free, open-source, and secure web-based application which can be run from a compatible browser on any device. The app will adopt the envelope system budgeting strategy (as opposed to “set and forget”) in order to empower users to better understand and control their finances. Users can organize monthly budgets with categories (Income, Food, Utilities, etc.), each customizable with a list of subcategories, also known as envelopes (Power, Water, Internet, ...) which transactions can be added to. Budget owners can invite others to join their budget and revoke shared access at any time, create dependent collaborators (children for example) as well as import or export their budget data.
