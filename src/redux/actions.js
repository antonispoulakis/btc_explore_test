import {RECEIVE_TRANSACTION, CLEAR_TRANSACTIONS} from "./actionTypes";

export const receiveTransaction = transaction => ({
  type: RECEIVE_TRANSACTION,
  payload: {transaction}
});

export const clearTransactions = () => ({
  type: CLEAR_TRANSACTIONS,
  payload: {}
});
