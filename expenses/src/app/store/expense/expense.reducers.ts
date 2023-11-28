import { ExpensesState, initialState } from './expense.state';
import {
  AddExpenseAction,
  ADD_EXPENSE_ACTION,
  ExpenseActions,
  GetExpensesActionSuccess,
  GET_EXPENSES_ACTION_SUCCESS,
  UpdateExpenseAction,
  UPDATE_EXPENSE_ACTION,
} from './expense.actions';

// Defining a type for the reducer function
type ReducerFunction = (
  state: ExpensesState,
  action: ExpenseActions
) => ExpensesState;

// Defining the actual reducer function
const reducer: ReducerFunction = (
  state: ExpensesState = initialState,
  action: ExpenseActions
): ExpensesState => {
  switch (action.type) {
    case ADD_EXPENSE_ACTION:
      // Handling the ADD_EXPENSE_ACTION type
      return {
        ...state,
        expenses: [
          ...state.expenses,
          (action as AddExpenseAction).payload.expense,
        ],
      };
    case UPDATE_EXPENSE_ACTION: {
      // Handling the UPDATE_EXPENSE_ACTION type
      const updatedExpense = (action as UpdateExpenseAction).payload.expense;
      const updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === updatedExpense.id) {
          return { ...expense, ...updatedExpense };
        }
        return expense;
      });

      return {
        ...state,
        expenses: updatedExpenses,
      };
    }
    case GET_EXPENSES_ACTION_SUCCESS: {
      // Handling the GET_EXPENSES_ACTION_SUCCESS type
      return {
        ...state,
        expenses: (action as GetExpensesActionSuccess).payload.expenses,
        count: (action as GetExpensesActionSuccess).payload.count,
      };
    }
    default:
      // Default case: return the current state
      return state;
  }
};

// Dispatch action inside your reducer
const dispatchActionInsideReducer =
  (action: ExpenseActions): ReducerFunction =>
  (state) => {
    return reducer(state, action);
  };

// Exporting the reducer and the dispatchActionInsideReducer function
export { reducer, dispatchActionInsideReducer };
