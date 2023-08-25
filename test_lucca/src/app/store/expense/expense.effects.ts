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
  private actions$: Subject<ExpenseActions>;
  addExpense$: Observable<ExpenseActions>;
  updateExpense$: Observable<ExpenseActions>;
  getExpenses$: Observable<ExpenseActions>;
  constructor(
    private expensesService: ExpensesService,
    actions: Subject<ExpenseActions>
  ) {
    this.actions$ = actions;

    this.addExpense$ = this.buildAddExpense();
    this.updateExpense$ = this.buildUpdateExpense();
    this.getExpenses$ = this.buildGetExpenses();
  }

  buildAddExpense(): Observable<ExpenseActions> {
    return this.actions$.pipe(
      filter((action) => action.type === ADD_EXPENSE_ACTION),
      map((action) => action as AddExpenseAction),
      mergeMap((action) =>
        this.expensesService.addExpense(action.payload.expense).pipe(
          map(() => {
            // déclenchement d'action pour ajout
            const updateActionsuccess: UpdateExpenseActionSuccess =
              updateExpenseActionSuccess();
            return updateActionsuccess;
          })
        )
      )
    );
  }

  buildUpdateExpense(): Observable<ExpenseActions> {
    return this.actions$.pipe(
      filter((action) => action.type === UPDATE_EXPENSE_ACTION),
      map((action) => action as UpdateExpenseAction),
      mergeMap((action) =>
        this.expensesService.updateExpense(action.payload.expense).pipe(
          map(() => {
            // déclenchement d'action pour update
            const updateAction: UpdateExpenseAction = updateExpenseAction(
              action.payload.expense
            );
            return updateAction;
          })
        )
      )
    );
  }

  buildGetExpenses(): Observable<ExpenseActions> {
    return this.actions$.pipe(
      filter((action) => action.type === GET_EXPENSES_ACTION),
      map((action) => action as GetExpensesAction),
      mergeMap((action) =>
        this.expensesService
          .getAllExpenses(action.payload.page, action.payload.limit)
          .pipe(
            map((data) => {
              // déclenchement d'action pour getAll
              const getAction: GetExpensesActionSuccess =
                getExpensesActionSuccess(data.items, data.count);
              return getAction;
            })
          )
      )
    );
  }
}
