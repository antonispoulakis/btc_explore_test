import _ from "lodash";

import { RECEIVE_TRANSACTION, CLEAR_TRANSACTIONS } from "../actionTypes";

const initialState = {
  transactions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TRANSACTION: {
      const { transaction } = action.payload;
      return {
        ...state,
        transactions: !_.find(state.transactions, tx => tx.hash === transaction.hash)
          ? [...state.transactions, transaction]
          : state.transactions
      };
    }
    case CLEAR_TRANSACTIONS: {
      return initialState;
    }
    default:
      return state;
  }
}
