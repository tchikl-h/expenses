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

// ADD

export interface AddExpenseAction {
  type: typeof ADD_EXPENSE_ACTION;
  payload: { expense: Expense };
}

export const addExpenseAction = (expense: Expense): AddExpenseAction => {
  const addExpenseAction: AddExpenseAction = {
    type: ADD_EXPENSE_ACTION,
    payload: { expense },
  };
  return addExpenseAction;
};

export interface AddExpenseActionSuccess {
  type: typeof ADD_EXPENSE_ACTION_SUCCESS;
  payload: { expense: Expense };
}

export const addExpenseActionSuccess = (
  expense: Expense
): AddExpenseActionSuccess => {
  const addExpenseActionSuccess: AddExpenseActionSuccess = {
    type: ADD_EXPENSE_ACTION_SUCCESS,
    payload: { expense },
  };
  return addExpenseActionSuccess;
};

export interface AddExpenseActionError {
  type: typeof ADD_EXPENSE_ACTION_ERROR;
}

export const addExpenseActionError = (): AddExpenseActionError => {
  const addExpenseActionError: AddExpenseActionError = {
    type: ADD_EXPENSE_ACTION_ERROR,
  };
  return addExpenseActionError;
};

// UPDATE

export interface UpdateExpenseAction {
  type: typeof UPDATE_EXPENSE_ACTION;
  payload: { expense: Expense };
}

export const updateExpenseAction = (expense: Expense): UpdateExpenseAction => {
  const updateExpenseAction: UpdateExpenseAction = {
    type: UPDATE_EXPENSE_ACTION,
    payload: { expense },
  };
  return updateExpenseAction;
};

export interface UpdateExpenseActionSuccess {
  type: typeof UPDATE_EXPENSE_ACTION_SUCCESS;
  payload: { expense: Expense };
}

export const updateExpenseActionSuccess = (
  expense: Expense
): UpdateExpenseActionSuccess => {
  const updateExpenseActionSuccess: UpdateExpenseActionSuccess = {
    type: UPDATE_EXPENSE_ACTION_SUCCESS,
    payload: { expense },
  };
  return updateExpenseActionSuccess;
};

export interface UpdateExpenseActionError {
  type: typeof UPDATE_EXPENSE_ACTION_ERROR;
}

export const updateExpenseActionError = (): UpdateExpenseActionError => {
  const updateExpenseActionError: UpdateExpenseActionError = {
    type: UPDATE_EXPENSE_ACTION_ERROR,
  };
  return updateExpenseActionError;
};

// FETCH

export interface GetExpensesAction {
  type: typeof GET_EXPENSES_ACTION;
  payload: { page: number; limit: number };
}

export const getExpensesAction = (
  page: number,
  limit: number
): GetExpensesAction => {
  const getExpensesAction: GetExpensesAction = {
    type: GET_EXPENSES_ACTION,
    payload: { page, limit },
  };
  return getExpensesAction;
};

export interface GetExpensesActionSuccess {
  type: typeof GET_EXPENSES_ACTION_SUCCESS;
  payload: { expenses: Expense[]; count: number };
}

export const getExpensesActionSuccess = (
  expenses: Expense[],
  count: number
): GetExpensesActionSuccess => {
  const getExpensesActionSuccess: GetExpensesActionSuccess = {
    type: GET_EXPENSES_ACTION_SUCCESS,
    payload: { expenses, count },
  };
  return getExpensesActionSuccess;
};

export interface GetExpensesActionError {
  type: typeof GET_EXPENSES_ACTION_ERROR;
}

export const getExpensesActionError = (): GetExpensesActionError => {
  const getExpensesActionError: GetExpensesActionError = {
    type: GET_EXPENSES_ACTION_ERROR,
  };
  return getExpensesActionError;
};

export type ExpenseActions =
  | AddExpenseAction
  | AddExpenseActionSuccess
  | AddExpenseActionError
  | UpdateExpenseAction
  | UpdateExpenseActionSuccess
  | UpdateExpenseActionError
  | GetExpensesAction
  | GetExpensesActionSuccess
  | GetExpensesActionError;
