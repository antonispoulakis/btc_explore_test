#!/usr/bin/env node

const open = require("amqplib").connect("amqp://localhost");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

const queue = "transactions";
const deliverables = [];

wss.on("connection", ws => {
  let shouldDeliverDirectly = true;
  ws.on("message", message => {
    if (message === "next") {
      if (deliverables.length > 0) {
        ws.send(JSON.stringify(deliverables.pop()));
      } else {
        shouldDeliverDirectly = true;
        ws.send("empty");
      }
    } else if (message === "ready") {
      shouldDeliverDirectly = true;
    }
  });
  open
    .then(async conn => {
      const channel = await conn.createChannel();
      const ok = await channel.assertQueue(queue, {
        durable: false
      });

      if (ok) {
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );
        channel.consume(queue, msg => {
          try {
            const transaction = JSON.parse(msg.content.toString());
            const tokens = transaction.size * 10;
            const deliverable = {
              ...transaction,
              tokens
            };
            console.log(" [x] Received %s", deliverable.hash);
            if (shouldDeliverDirectly) {
              ws.send(JSON.stringify(deliverable));
              shouldDeliverDirectly = false;
            } else {
              deliverables.push(deliverable);
            }
          } catch (e) {
            console.log(e);
          }
        });
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    .catch(console.warn);
});
