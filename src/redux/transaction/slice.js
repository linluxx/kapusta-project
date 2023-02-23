import { createSlice } from '@reduxjs/toolkit';
import {
  getSummary,
  getTransactionsByOperation,
  addTransaction,
  deleteTransaction,
} from './operations';

const initialState = {
  transactions: [],
  summary: [],
  error: null,
  isLoading: false,
  operationType: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    operationType(state, action) {
      state.operationType = action.payload;
    },
  },
  extraReducers: {
    [getSummary.fulfilled]: (state, action) => {
      state.summary = action.payload;
      state.isLoading = false;
    },
    [getSummary.rejected](state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [getSummary.pending](state) {
      state.isLoading = true;
    },
    [getTransactionsByOperation.fulfilled]: (state, action) => {
      state.transactions = action.payload;
      state.isLoading = false;
    },
    [getTransactionsByOperation.rejected](state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [getTransactionsByOperation.pending](state) {
      state.isLoading = true;
    },
    [addTransaction.fulfilled]: (state, action) => {
      state.transactions.push(action.payload.data);
      state.summary.map(item => {
        if (item.month !== action.payload.data.month) {
          return item;
        }
        return (item.sum = item.sum + action.payload.data.sum);
      });

      state.isLoading = false;
    },
    [addTransaction.rejected](state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [addTransaction.pending](state) {
      state.isLoading = true;
    },
    [deleteTransaction.fulfilled]: (state, action) => {
      const index = state.transactions.findIndex(
        transaction => transaction._id === action.payload._id
      );
      state.transactions.splice(index, 1);
      // state.transactions.push(action.payload.data);
      state.summary.map(item => {
        if (item.month !== action.payload.month) {
          return item;
        }
        return (item.sum = item.sum + action.payload.sum);
      });

      state.isLoading = false;
    },
    [deleteTransaction.rejected](state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [deleteTransaction.pending](state) {
      state.isLoading = true;
    },
  },
});

export const transactionReducer = transactionSlice.reducer;
export const { operationType } = transactionSlice.actions;
