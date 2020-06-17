# book_app

**Author**: Sean Murray and Paul Rest
**Version**: 1.1.5

## Overview
It's like the library but for 2020

## Getting Started

### Step 1:
Once you have cloned the repo in the command line run:

```console
$ npm i
$ touch .env
```
### Step 2:
In the directory open the **.env** file and insert the following:
 - openport should be a number for an open port on your machine.
```
PORT=<openport>
DATABASE=db-url
```

### Step 3:
From the root directory on the command like run the following commands:

```console
$ psql
```
```sql
# CREATE DATABASE dbname;
# \q
```
```console
$ psql -d dbname -f schema.sql
$ psql -d dbname -f seed.sql

```
### Step 4:
To start the server run the following in the terminal:

```console
$ npm start
```

## Architecture
Backend utilizes superagent for API calls to googlebooks API and postgres to query a SQL database. Frontend is served with EJS components.

### Libraries Used:
 - Express
 - EJS
 - dotenv
 - superagent
 - pg


## Change Log
 - 06-15-2020 1800 Add Book api and basic layout of routes and CSS.
 - 06-16-2020 1800 Add SQL db to persist user book selections, Add detailed view for books in collection.
 - 06-17-2020 1500 Add ability to update and remove items from database from the detailed view of individual books.
 - 06-17-2020 1700 Add ability to search by author from the database/