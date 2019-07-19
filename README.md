# phonebook-wemanity

This is a phone book. You can add, edit and see your contact.

It is a MERN stack application: MongoDB, Express, ReactJS and NodeJS.

## How to install

To launch the project you will need the following in your PC :

- Install [GIT](https://git-scm.com/downloads)
- Install [NodeJs](https://nodejs.org/en/download/)
- Install [VS Code](https://code.visualstudio.com/download)
- Install [MongoDB](https://www.mongodb.com/download-center/community)
- Clone this repository
- Create a .env file with your variables like in [.env.example](./.env.example) file.

### Database

You have to launch MongoDB on you PC and put the environment variable 'DB_URL' in the [.env.example](./.env.example) file with your database name.
The collection 'contact' will be automatically created in the first insert in your database.

## Run the code

In the project directory, you can run the following scripts:

### Install the dependencies for the API and the Web

`npm run install-all`

Install all the dependencies in the package.json and create a `node_modules/` folder in the project directory and in client directory.

### Run the project

`npm run dev`

Runs the Express server API and the react project.

## Endpoints

The API contains several endpoints:

* POST api/contact: Add a new contact
  Body: {
    firstName: string, required,
    lastName: string, required,
    phone: string, required, format '+XX XX XXXXXX'
  }
  Response: the new contact
    {
        "_id": "xxx",
        "firstName": "Xxx",
        "lastName": "Xxx",
        "phone": "+XX XX XXXXXX",
        "dateAdd": "YYYY-MM-DDTHH:mm:SS.sssZ"
    }

* GET api/contact: Get contacts
  Query: {
    limit: int (maximum of contacts returned),
    skip: int (skip the first contacts),
    sort: string (the attribute to sort the contact),
    sort_order: 1 (sort asc) or -1 (sort desc),
  }
  Response: list of contacts

* PUT api/contact/:_id: Edit a contact
  Params: {
    _id: contact Mondgo ID
  }
  Body: {
    firstName: string, required,
    lastName: string, required,
    phone: string, required, format '+XX XX XXXXXX'
  }
  Response: the edited contact

* DELETE api/contact/:_id: Delete a contact
  Params: {
    _id: contact Mondgo ID
  }
  Response: the deleted contact

## Folder Structure

The project structure look like this:

```
phonebook-wemanity/
  README.md
  node_modules/
  client/ --> React project
  config/
    db.js --> Database connection
  models/ --> Database model, Mongoose Schema
  routes/ --> Endpoints of the API
  package.json --> dependencies and scripts
  server.js --> Express server to serve the app, execute functions from 
```