#!/usr/bin/env node

const open = require("amqplib").connect("amqp://localhost");
const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 8080});

const queue = "transactions";
const deliverables = [];
const webSockets = [];

const handleMsg = msg => {
  try {
    const transaction = JSON.parse(msg.content.toString());
    const deliverable = {
      ...transaction,
      tokens: 0
    };

    console.log(" [x] Received %s", deliverable.hash);

    deliverable.tokens = transaction.size * 10;

    return deliverable;
  } catch (e) {
    return {};
  }
};

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
        ws.send("empty");
      }
    } else if (message === "ready") {
      webSockets[wsIndex].shouldDeliverDirectly = true;
    }
  });
});

(async () => {
  try {
    const conn = await open;
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
          const deliverable = handleMsg(msg);

          webSockets.forEach(({ws, shouldDeliverDirectly}, index) => {
            if (shouldDeliverDirectly) {
              ws.send(JSON.stringify(deliverable));
              webSockets[index].shouldDeliverDirectly = false;
            } else {
              deliverables.push(deliverable);
            }
          });
        },
        {
          noAck: true
        }
      );
    } else {
      process.exit(-1);
    }
  } catch (e) {
    console.warn(e);
    process.exit(-1);
  }
})();
