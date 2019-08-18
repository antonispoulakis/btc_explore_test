import React, { useState, useEffect } from "react";
import _ from "lodash";

import { w3cwebsocket as W3CWebSocket } from "websocket";

const Transactions = () => {
  const [transactions, SetTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState(null);

  useEffect(() => {
    const client = new W3CWebSocket("ws://127.0.0.1:8080");
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      client.send("ready");
    };
    client.onmessage = message => {
      let transaction = null;
      try {
        transaction = JSON.parse(message.data);
      } catch (e) {
        console.log("message was not json");
      }
      if (transaction) {
        setNewTransaction(transaction);
        client.send("next");
      } if (message.data === "empty") {
        client.send("ready");
      }
    };
  }, []);

  useEffect(() => {
    if (!newTransaction) {
      return;
    }
    if (!_.find(transactions, tr => tr.hash === newTransaction.hash)) {
      console.log("pushing " + newTransaction.hash);
      SetTransactions(transactions => [...transactions, newTransaction]);
    } else {
      console.log("duplicate transaction detected");
    }
  }, [newTransaction]);

  return (
    <div className="Transactions">
      <header className="App-header">
        {!_.isEmpty(transactions) ? (
          <div style={{ padding: 5 }}>
            <h2>Transactions with tokens: </h2>
            <div className="list-group">
              {transactions.map(item => (
                <button
                  className="list-group-item list-group-item-action"
                  key={item.hash}
                  onClick={() =>
                    window.open(
                      `https://www.blockchain.com/btctest/tx/${item.hash}`,
                      "_blank"
                    )
                  }>
                  {item.hash} - {item.tokens}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2>Waiting for Transactions</h2>
          </div>
        )}
      </header>
    </div>
  );
};

export default Transactions;
