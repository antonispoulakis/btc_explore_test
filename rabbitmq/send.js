#!/usr/bin/env node

const open = require("amqplib").connect("amqp://localhost");
const blockexplorer = require("blockchain.info/blockexplorer").usingNetwork(3);
const _ = require("lodash");

const queue = "transactions";

open
  .then(async conn => {
    const channel = await conn.createChannel();
    const ok = await channel.assertQueue(queue, {
      durable: false
    });
    if (ok) {
      const addresses = [
        "2MwcVyhWzUrS6AK8mwAZPjBfeQqtdEGgeSg",
        "2NE7cEdVPFPrVviMvnQYGiNfeTMZnokHu23",
        "2MtcSCijSWDruTq316PNV8onKzeq4amMPb3",
        "2N2u2dMHKr4B7CMPQNptxEqrGWu9fVfCA5m",
        "2N2C6oBBvrC8Kan4bREcvPQHLUE9FpgCY6g"
      ];

      const { txs } = await blockexplorer.getMultiAddress(addresses);

      _.forEach(txs, (item, index) => {
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(item)));
        console.log(" [x] Sent transaction in index: %d", index);
      });

      // channel.sendToQueue(queue, Buffer.from(JSON.stringify("{gia: true}")));
      console.log(" [x] Sent everything");

      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
  .catch(console.warn);
