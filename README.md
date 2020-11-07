# Mango-BB

## Setup

1. Clone this repository!
1. Run the following commands:
```cmd
cd frontend
npm install
cd ..
cd backend
npm install
```
1. Make sure you have a functioning SQL server and MongoDB server, and connect them via `./backend/config/secrets.js`
1. Once you're done, have 2 terminals open.
1. Run `npm start` in both `./frontend` and `./backend`

### Issues & Solutions
If you're on windows, you may encounter this problem.
If you're having trouble getting `npm install` or `npm start` to work on `./backend`, consider these steps:
1. Remove the folder `./backend/node_modules`
2. Uninstall Node JS from your laptop via Control Panel > Programs and Features.
1. Install nvm, and make sure you install and use npm version `10.15.1`.
