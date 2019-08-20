import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { initWebSocket, getTransactions } from "../redux/selectors";
import Transaction from "./Transaction";

// import { w3cwebsocket as W3CWebSocket } from "websocket";

const Transactions = ({ transactions }) => {
  // const [transactions, SetTransactions] = useState([]);
  // const [newTransaction, setNewTransaction] = useState(null);

  useEffect(() => {
    initWebSocket();
  }, []);

  return (
    <div className="Transactions">
      <header className="App-header">
        {!_.isEmpty(transactions) ? (
          <div style={{ padding: 5 }}>
            <h2>Transactions with tokens: </h2>
            <div className="list-group">
              {transactions.map(transaction => (
                <Transaction key={transaction.hash} transaction={transaction}/>
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

const mapStateToProps = state => {
  // const { visibilityFilter } = state;
  const transactions = getTransactions(state);

  return {
    transactions
  };
};

export default connect(mapStateToProps)(Transactions);
