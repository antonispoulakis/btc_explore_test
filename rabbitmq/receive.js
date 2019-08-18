#!/usr/bin/env node

const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = "transactions";

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      (msg) => {
        // let item = {};
        try {
          const transaction = JSON.parse(msg.content.toString());
          const tokens = transaction.size * 10;
          const deliverable = {
            hash: transaction.hash,
            tokens
          }
          console.log(" [x] Received %s", deliverable);

        } catch(e) {
          console.log(e);
        }
      },
      {
        noAck: true
      }
    );
  });
});
