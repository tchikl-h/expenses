import { Expense } from 'src/app/models/expense';

export interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  count: number;
}

export const state: ExpensesState = {
  expenses: [],
  loading: false,
  count: 0,
};

export const initialState: ExpensesState = {
  expenses: [],
  loading: false,
  count: 0,
};
