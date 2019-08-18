import React, { useState } from "react";
import _ from "lodash";

// import Web3 from "web3";

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
    // @todo: use websocket to read from rabbitmq consumer

    // const res = await blockexplorer.getMultiAddress(addresses);

    // console.log(res);
    // const items = res.txs.map((item, key) => (
    //   <button className="list-group-item list-group-item-action" key={item.hash}>
    //     {item.hash}
    //   </button>
    // ));

    // SetTxses(items);
    setLoadingTransactions(false);
  };
  const unLoadTransactions = () => {
    SetTxses([]);
  };

  return (
    <div className="Transactions">
      <header className="App-header">
        {!_.isEmpty(txses) ? (
          <div style={{ padding: 5 }}>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={unLoadTransactions}>
              {" "}
              Unload Transactions
            </button>
            <h2>Transaction addresses: </h2>
            <div className="list-group">{txses}</div>
          </div>
        ) : (
          <div>
            {loadingTransactions ? (
              <h2>Loading transactions...</h2>
            ) : (
              <h2>Click below to load transactions:</h2>
            )}
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              disabled={loadingTransactions}
              onClick={loadTransactions}>
              Load Transactions
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Transactions;
