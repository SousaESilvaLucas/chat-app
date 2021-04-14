# Lucas's Chat API


## Developing

### Prerequisites

**Software:**

- Node
- RabbitMQ (I used the docker image)
- Docker

**Configuration:**

- There really isn't any. The express server is hardcoded to port 3000 and the rabbitMQ is expected to be running on localhost on the standard port (5672)

### Setting up the APP

```shell
git clone git@github.com:SousaESilvaLucas/chat-app.git
cd chat-app/
npm install # can also use `yarn install`
```

### Running

Once installed make sure to start a RabbitMQ server:
```shell
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Then you can just run the web server with:

```shell
node server.js
```
and the task worker, as a separate process, with
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
