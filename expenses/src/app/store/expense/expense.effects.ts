import { Observable, Subject } from 'rxjs';
import { mergeMap, map, filter } from 'rxjs/operators';
import { ExpensesService } from 'src/app/services/expense.service';
import {
  ExpenseActions,
  AddExpenseAction,
  UpdateExpenseAction,
  updateExpenseAction,
  GetExpensesAction,
  UPDATE_EXPENSE_ACTION,
  ADD_EXPENSE_ACTION,
  GET_EXPENSES_ACTION,
  getExpensesActionSuccess,
  GetExpensesActionSuccess,
  updateExpenseActionSuccess,
  UpdateExpenseActionSuccess,
} from './expense.actions';

export class ExpensesEffects {
  // Private property to hold the stream of actions
  private actions$: Subject<ExpenseActions>;

  // Observable properties for handling different types of actions
  addExpense$: Observable<ExpenseActions>;
  updateExpense$: Observable<ExpenseActions>;
  getExpenses$: Observable<ExpenseActions>;

  constructor(
    private expensesService: ExpensesService,
    actions: Subject<ExpenseActions>
  ) {
    this.actions$ = actions;

    // Initializing the observable properties using helper methods
    this.addExpense$ = this.buildAddExpense();
    this.updateExpense$ = this.buildUpdateExpense();
    this.getExpenses$ = this.buildGetExpenses();
  }

  // Helper method to build the addExpense$ observable
  buildAddExpense(): Observable<ExpenseActions> {
    return this.actions$.pipe(
      filter((action) => action.type === ADD_EXPENSE_ACTION),
      map((action) => action as AddExpenseAction),
      mergeMap((action) =>
        // Calling http POST request
        this.expensesService.addExpense(action.payload.expense).pipe(
          map(() => {
            const updateActionsuccess: UpdateExpenseActionSuccess =
              updateExpenseActionSuccess();
            return updateActionsuccess;
          })
        )
      )
    );
  }

  // Helper method to build the updateExpense$ observable
  buildUpdateExpense(): Observable<ExpenseActions> {
    return this.actions$.pipe(
      filter((action) => action.type === UPDATE_EXPENSE_ACTION),
      map((action) => action as UpdateExpenseAction),
      mergeMap((action) =>
        // Calling http PUT request
        this.expensesService.updateExpense(action.payload.expense).pipe(
          map(() => {
            // Creating an action for successful expense update
            const updateAction: UpdateExpenseAction = updateExpenseAction(
              action.payload.expense
            );
            return updateAction;
          })
        )
      )
    );
  }

  // Helper method to build the getExpenses$ observable
  buildGetExpenses(): Observable<ExpenseActions> {
    return this.actions$.pipe(
      filter((action) => action.type === GET_EXPENSES_ACTION),
      map((action) => action as GetExpensesAction),
      mergeMap((action) =>
        // Calling http GET request
        this.expensesService
          .getAllExpenses(action.payload.page, action.payload.limit)
          .pipe(
            map((data) => {
              // Creating an action for successful retrieval of expenses
              const getAction: GetExpensesActionSuccess =
                getExpensesActionSuccess(data.items, data.count);
              return getAction;
            })
          )
      )
    );
  }
}
