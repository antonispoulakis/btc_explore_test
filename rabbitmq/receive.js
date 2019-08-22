#!/usr/bin/env node

const open = require("amqplib").connect("amqp://localhost");
const WebSocket = require("ws");
const _ = require("lodash");

const wss = new WebSocket.Server({ port: 8080 });

const queue = "transactions";
const deliverables = [];
const webSockets = [];

console.log(" [*] Initializing RabbitMq ...");
open
  .then(async conn => {
    const channel = await conn.createChannel();
    const ok = await channel.assertQueue(queue, {
      durable: false
    });

    if (ok) {
      console.log(
        " [*] RabbitMq initialized. Waiting for messages in %s. To exit press CTRL+C",
        queue
      );
      channel.consume(
        queue,
        msg => {
          try {
            const transaction = JSON.parse(msg.content.toString());
            const deliverable = {
              ...transaction,
              tokens: transaction.size * 10
            };
            console.log(" [x] Received %s", deliverable.hash);
            _.forEach(webSockets, ({ ws, shouldDeliverDirectly }, index) => {
              if (shouldDeliverDirectly) {
                ws.send(JSON.stringify(deliverable));
                webSockets[index].shouldDeliverDirectly = false;
              } else {
                deliverables.push(deliverable);
              }
            });
          } catch (e) {
            console.log(e);
          }
        },
        {
          noAck: true
        }
      );
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .catch(console.warn);

wss.on("connection", ws => {
  console.log("[+] New WebSocket connection established");

  let wsIndex = webSockets.length;

  webSockets.push({
    ws,
    shouldDeliverDirectly: true,
    deliverables
  });
  ws.on("message", message => {
    if (message === "next") {
      if (deliverables.length > 0) {
        ws.send(JSON.stringify(deliverables.pop()));
      } else {
        // webSockets[wsIndex].shouldDeliverDirectly = true;
        ws.send("empty");
      }
    } else if (message === "ready") {
      webSockets[wsIndex].shouldDeliverDirectly = true;
    }
  });
});
