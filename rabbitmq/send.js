#!/usr/bin/env node

const open = require("amqplib").connect("amqp://localhost");
const blockexplorer = require("blockchain.info/blockexplorer").usingNetwork(3);

const queue = "transactions";

(async () => {
  try {
    const conn = await open;
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
      const {txs} = await blockexplorer.getMultiAddress(addresses);

      txs.forEach((item, index) => {
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(item)));
        console.log(" [x] Sent transaction in index: %d", index);
      });

      console.log(" [x] Sent everything");
    } else {
      process.exit(-1);
    }
  } catch (e) {
    console.warn(e);
  }
})();
