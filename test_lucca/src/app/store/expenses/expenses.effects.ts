import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addExpense,
  addExpenseError,
  addExpenseSuccess,
  getAllExpenses,
  getAllExpensesError,
  getAllExpensesSuccess,
  updateExpense,
  updateExpenseSuccess,
} from './expenses.actions';
import { ExpensesService } from 'src/app/services/expense.service';
import { catchError, map, mergeMap } from 'rxjs';
import { Expense } from 'src/app/models/expense';
import { Update } from '@ngrx/entity';

@Injectable()
export class ExpensesEffects {
  constructor(
    private actions$: Actions,
    private expensesService: ExpensesService
  ) {}

  addExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addExpense),
      mergeMap((action) =>
        this.expensesService.addExpense(action.expense).pipe(
          map((data) => {
            const expense: Expense = { ...action.expense, id: data.id };
            return addExpenseSuccess({ expense });
          }),
          catchError(() => [addExpenseError()])
        )
      )
    )
  );

  updateExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateExpense),
      mergeMap((action) =>
        this.expensesService.updateExpense(action.expense).pipe(
          map(() => {
            const updatedExpense: Update<Expense> = {
              // TODO: enlever le ternaire
              id: action.expense.id ? action.expense.id : -1,
              changes: {
                ...action.expense,
              },
            };
            return updateExpenseSuccess({ expense: updatedExpense });
          }),
          catchError(() => [addExpenseError()])
        )
      )
    )
  );

  getAllExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllExpenses),
      mergeMap(({ page, limit }) =>
        this.expensesService.getAllExpenses(page, limit).pipe(
          map((payload) =>
            getAllExpensesSuccess({
              expenses: payload.items,
              count: payload.count,
            })
          ),
          catchError(() => [getAllExpensesError()])
        )
      )
    )
  );
}
