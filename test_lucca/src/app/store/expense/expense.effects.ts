import { Observable, of, Subject } from 'rxjs';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ExpensesService } from 'src/app/services/expense.service';
import {
  AddExpenseActionError,
  ExpenseActions,
  ADD_EXPENSE_ACTION_ERROR,
  AddExpenseAction,
  UpdateExpenseAction,
  updateExpenseAction,
  GetExpensesAction,
  UpdateExpenseActionError,
  UPDATE_EXPENSE_ACTION_ERROR,
  GetExpensesActionError,
  GET_EXPENSES_ACTION_ERROR,
  UPDATE_EXPENSE_ACTION,
  ADD_EXPENSE_ACTION,
  GET_EXPENSES_ACTION,
  getExpensesActionSuccess,
  GetExpensesActionSuccess,
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

    this.addExpense$.subscribe();
    this.updateExpense$.subscribe();
    this.getExpenses$.subscribe();
  }

  buildAddExpense(): Observable<ExpenseActions> {
    return this.actions$.pipe(
      filter((action) => action.type === ADD_EXPENSE_ACTION),
      map((action) => action as AddExpenseAction),
      mergeMap((action) =>
        this.expensesService.addExpense(action.payload.expense).pipe(
          map((data) => {
            // déclenchement d'action pour ajout
            const updateAction: UpdateExpenseAction = updateExpenseAction({
              ...action.payload.expense,
              id: data.id,
            });
            return updateAction;
          }),
          catchError(() => {
            // action delete
            const addExpenseErrorAction: AddExpenseActionError = {
              type: ADD_EXPENSE_ACTION_ERROR,
            };
            return of(addExpenseErrorAction);
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
          }),
          catchError(() => {
            const updateExpenseErrorAction: UpdateExpenseActionError = {
              type: UPDATE_EXPENSE_ACTION_ERROR,
            };
            return of(updateExpenseErrorAction);
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
            }),
            catchError(() => {
              const getExpensesErrorAction: GetExpensesActionError = {
                type: GET_EXPENSES_ACTION_ERROR,
              };
              return of(getExpensesErrorAction);
            })
          )
      )
    );
  }
}
