
## How to run
To initialize the websocket and rabbitmq and listen to them:
In one terminal:
``` cd rabbitmq
    npm run receive
```
To open the page and connect to the websocket of receive.js:
In another terminal (on root directory):
``` npm run start
```

To send the transactions through rabbitmq (this needs to be closed and re-opened manually):
In another terminal: 
```
  npm run send
```
