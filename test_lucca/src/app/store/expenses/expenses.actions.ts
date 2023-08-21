import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expense';

export const expensesKey = '[Expenses]';
export const ADD_EXPENSE_ACTION = `${expensesKey} Add Expense`;
export const ADD_EXPENSE_ACTION_SUCCESS = `${expensesKey} Add Expense Success`;
export const ADD_EXPENSE_ACTION_ERROR = `${expensesKey} Add Expense Error`;

export const UPDATE_EXPENSE_ACTION = `${expensesKey} Update Expense`;
export const UPDATE_EXPENSE_ACTION_SUCCESS = `${expensesKey} Update Expense Success`;
export const UPDATE_EXPENSE_ACTION_ERROR = `${expensesKey} Update Expense Error`;

export const GET_EXPENSES_ACTION = `${expensesKey} Get Expenses`;
export const GET_EXPENSES_ACTION_SUCCESS = `${expensesKey} Get Expenses Success`;
export const GET_EXPENSES_ACTION_ERROR = `${expensesKey} Get Expenses Error`;

export const addExpense = createAction(
  ADD_EXPENSE_ACTION,
  props<{ expense: Expense }>()
);

export const addExpenseSuccess = createAction(
  ADD_EXPENSE_ACTION_SUCCESS,
  props<{ expense: Expense }>()
);

export const addExpenseError = createAction(ADD_EXPENSE_ACTION_ERROR);

export const updateExpense = createAction(
  UPDATE_EXPENSE_ACTION,
  props<{ expense: Expense }>()
);

export const updateExpenseSuccess = createAction(
  UPDATE_EXPENSE_ACTION_SUCCESS,
  props<{ expense: Update<Expense> }>()
);

export const updateExpenseError = createAction(UPDATE_EXPENSE_ACTION_ERROR);

export const getAllExpenses = createAction(GET_EXPENSES_ACTION);

export const getAllExpensesSuccess = createAction(
  GET_EXPENSES_ACTION_SUCCESS,
  props<{ expenses: Expense[] }>()
);

export const getAllExpensesError = createAction(GET_EXPENSES_ACTION_ERROR);
