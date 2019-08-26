import React, {memo} from "react";
import {connect} from "react-redux";

const Transaction = memo(({transaction}) => (
  <button
    className="list-group-item list-group-item-action py-2"
    key={transaction.hash}
    onClick={() =>
      window.open(
        `https://www.blockchain.com/btctest/tx/${transaction.hash}`,
        "_blank"
      )
    }>
    {transaction.hash} - {transaction.tokens}
  </button>
));

export default connect(null)(Transaction);
