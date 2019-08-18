#!/usr/bin/env node

const amqp = require("amqplib/callback_api");
const blockexplorer = require("blockchain.info/blockexplorer").usingNetwork(3);
const _ = require("lodash");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel(async (error1, channel) => {
    if (error1) {
      throw error1;
    }
    const queue = "transactions";

    const addresses = [
      "2MwcVyhWzUrS6AK8mwAZPjBfeQqtdEGgeSg",
      "2NE7cEdVPFPrVviMvnQYGiNfeTMZnokHu23",
      "2MtcSCijSWDruTq316PNV8onKzeq4amMPb3",
      "2N2u2dMHKr4B7CMPQNptxEqrGWu9fVfCA5m",
      "2N2C6oBBvrC8Kan4bREcvPQHLUE9FpgCY6g"
    ];

    const items = await blockexplorer.getMultiAddress(addresses);

    // console.log(res);
    // const items = res.txs.map((item, key) => item.hash);

    // console.log(items);

    channel.assertQueue(queue, {
      durable: false
    });

    _.forEach(items.txs, (item, index) => {
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(item)));
      console.log(" [x] Sent transaction in index: %d", index);
    });

    // channel.sendToQueue(queue, Buffer.from(JSON.stringify("{gia: true}")));
    console.log(" [x] Sent everything");
    // connection.close();
  });
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 10000);
});
