import { ActionReducer, createReducer, on } from '@ngrx/store';
import { adapter, initialState, ExpensesState } from './expenses.state';
import {
  addExpenseSuccess,
  getAllExpensesSuccess,
  updateExpenseSuccess,
} from './expenses.actions';

export const expensesReducers: ActionReducer<ExpensesState> = createReducer(
  initialState,
  on(addExpenseSuccess, (state: ExpensesState, action) =>
    adapter.addOne(action.expense, state)
  ),
  on(updateExpenseSuccess, (state: ExpensesState, action) =>
    adapter.updateOne(action.expense, state)
  ),
  on(getAllExpensesSuccess, (state: ExpensesState, action) =>
    adapter.setAll(action.expenses, state)
  )
);
