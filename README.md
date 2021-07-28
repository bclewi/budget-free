# BudgetFree

This project could help meet the need for a free and open-source personal budgeting software which is accessible from any device. The back-end web-app runs on Node.js and connects to a PostgreSQL database via the ORM Sequelize. The app provides a RESTful API with authentication and CRUD functionality for front-end projects.

## Local Install and Config for Developers

1. Install [npm](https://www.npmjs.com/) and [postgreSQL](https://www.postgresql.org/) on your local machine.

2. Clone this repo: `git clone https://github.com/bclewi5555/budget-free.git`

3. Navigate to the server directory

4. Create a new environment config file named `.env` with the contents below, replacing `secret` with your actual postgres user password and session secret.
```
PORT=4000
REACT_APP_PORT=3000
NODE_ENV=development

PGPORT=5432
PGUSER=postgres
PGHOST=localhost
PGDATABASE=budgetfree
PGPASSWORD=secretpassword

SESSION_LIFETIME=3600000
SESSION_SECRET=secret

SESSION_STORE_CLEANUP_INTERVAL=900000
SESSION_STORE_EXPIRATION=86400000

PASSWORD_HASH_SAMPLE=<Redacted Sample Hash For Sample User>
```

5. Start up an empty PosgreSQL database named `budgetfree` from the default user (`postgres`) on the default port (`5432`)

## Launch App for Local Development

`npm run start`

## Project Vision

This project will be a free, open-source, and secure web-based application which can be run from a compatible browser on any device. The app will adopt the envelope system budgeting strategy (as opposed to “set and forget”) in order to empower users to better understand and control their finances. Users can organize monthly budgets with categories (Income, Food, Utilities, etc.), each customizable with a list of subcategories, also known as envelopes (Power, Water, Internet, ...) which transactions can be added to. Budget owners can invite others to join their budget and revoke shared access at any time, create dependent collaborators (children for example) as well as import or export their budget data.
