import { Expense } from 'src/app/models/expense';

export interface ExpensesState {
  expenses: Expense[];
  count: number;
}

export const state: ExpensesState = {
  expenses: [],
  count: 0,
};

export const initialState: ExpensesState = {
  expenses: [],
  count: 0,
};
