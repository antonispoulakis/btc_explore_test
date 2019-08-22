import { w3cwebsocket as W3CWebSocket } from "websocket";

import { receiveTransaction } from "./actions";
import store from "./store";

export const initWebSocket = () => {
  const client = new W3CWebSocket("ws://127.0.0.1:8080");
  client.onopen = () => {
    console.log("WebSocket Client Connected");
    client.send("ready");
  };
  client.onmessage = async message => {
    let transaction = null;
    try {
      transaction = JSON.parse(message.data);
    } catch (e) {
      console.log("message was not json");
    }
    if (transaction) {
      console.log("received transaction: " + transaction.hash);
      await store.dispatch(receiveTransaction(transaction));
      // receiveTransaction(transaction);
      client.send("next");
    }
    if (message.data === "empty") {
      client.send("ready");
    }
  };
};

export const getTransactionsState = state => state.transactions;

export const getTransactions = state =>
  getTransactionsState(state) ? getTransactionsState(state).transactions : [];
