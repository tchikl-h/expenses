import { ExpensesState, initialState } from './expense.state';
import {
  AddExpenseActionSuccess,
  ADD_EXPENSE_ACTION,
  ExpenseActions,
  GetExpensesActionSuccess,
  GET_EXPENSES_ACTION_SUCCESS,
  UpdateExpenseActionSuccess,
  UPDATE_EXPENSE_ACTION,
} from './expense.actions';

type ReducerFunction = (
  state: ExpensesState,
  action: ExpenseActions
) => ExpensesState;

const reducer: ReducerFunction = (
  state: ExpensesState = initialState,
  action: ExpenseActions
): ExpensesState => {
  switch (action.type) {
    case ADD_EXPENSE_ACTION:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          (action as AddExpenseActionSuccess).payload.expense,
        ],
      };
    case UPDATE_EXPENSE_ACTION: {
      const updatedExpense = (action as UpdateExpenseActionSuccess).payload
        .expense;
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
      return {
        ...state,
        expenses: (action as GetExpensesActionSuccess).payload.expenses,
        count: (action as GetExpensesActionSuccess).payload.count,
      };
    }
    default:
      return state;
  }
};

// Dispatch action inside your reducer
const dispatchActionInsideReducer =
  (action: ExpenseActions): ReducerFunction =>
  (state, _) => {
    return reducer(state, action);
  };

// Export your reducer
export { reducer, dispatchActionInsideReducer };
