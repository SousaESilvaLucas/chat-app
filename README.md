# Lucas's Chat API


## Developing

### Prerequisites

**Software:**

- Node (see .nvmrc to see which node version to install)
- RabbitMQ

**Configuration:**

- There really isn't any. The express server is hardcoded to port 3000 and the rabbitMQ is expected to be running on localhost on the standard port (5672)

### Setting up the APP

```shell
git clone git@github.com:
cd chat-app/
npm install # can also use `yarn install`
```

### Running

Once installed you can just run the web server with:

```shell
node server.js
```
and the task worker with
```shell
node worker.js
``` 

The server should start up successfully and you should be able to access it the app's home page from
http://localhost:3000


## Tests

Didn't have time to write any :D

## Style guide and coding conventions

This repository is set up with the following code analysis tools:

- `Prettier` - to enforce coding conventions
- `ESLint` - to enforce code style and more conventions
