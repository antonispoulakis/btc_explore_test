import React, { useState } from "react";
import _ from "lodash";
import "../App.css";

// import Web3 from "web3";
const blockexplorer = require("blockchain.info/blockexplorer").enableCors(false).usingNetwork(3);

const Transactions = () => {
  // const web3 = new Web3();
  const addresses = [
    "2MwcVyhWzUrS6AK8mwAZPjBfeQqtdEGgeSg",
    "2NE7cEdVPFPrVviMvnQYGiNfeTMZnokHu23",
    "2MtcSCijSWDruTq316PNV8onKzeq4amMPb3",
    "2N2u2dMHKr4B7CMPQNptxEqrGWu9fVfCA5m",
    "2N2C6oBBvrC8Kan4bREcvPQHLUE9FpgCY6g"
  ];
  const [txses, SetTxses] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  // useEffect(() => {
  //   loadTransactions();
  // }, []);

  const loadTransactions = async () => {
    setLoadingTransactions(true);
    const res = await blockexplorer.getMultiAddress(addresses);

    console.log(res);
    const items = res.txs.map((item, key) => (
      <li key={item.hash}>{item.hash}</li>
    ));

    SetTxses(items);
    setLoadingTransactions(false);
  };
  const unLoadTransactions = () => {
    SetTxses([]);
  };

  return (
    <div className="Transactions">
      <header className="App-header">
        {!_.isEmpty(txses) ? (
          <div style={{padding: 5}}>
            <button onClick={unLoadTransactions}> Unload Transactions</button>
            <h2>Transactions: </h2>
            <ul>{txses}</ul>
          </div>
        ) : (
          <div>
            {loadingTransactions ? (
              <h2>Loading transactions...</h2>
            ) : (
              <h2>Click below to load transactions:</h2>
            )}
            <button disabled={loadingTransactions} onClick={loadTransactions}>
              Load Transactions
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Transactions;
