# book_app

**Author**: Sean Murray and Paul Rest
**Version**: 1.1.2

## Overview


## Getting Started

### Step 1:
Once you have cloned the repo in the command line run:

```
npm i
```
### Step 2:
Create a local **.env** file and insert the following:
 - openport should be a number for an open port on your machine.
```
PORT=<openport>
```

### Step 3:
To start the server run the following in the terminal:

```
npm start
```

## Architecture


### Libraries Used:
 - Express
 - EJS
 - dotenv
 - superagent
 - pg


## Change Log
 - 06-16-2020 1800 Add Book api and basic layout of routes and CSS.
 -06-17-2020 1800 Add SQL db to persist user book selections, Add detailed view for books in collection.