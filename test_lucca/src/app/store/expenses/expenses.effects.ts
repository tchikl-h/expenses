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

  // Effect to handle adding an expense
  addExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addExpense),
      mergeMap((action) =>
        this.expensesService.addExpense(action.expense).pipe(
          map((data) => {
            // Create a new expense object with the returned ID from the server
            const expense: Expense = { ...action.expense, id: data.id };
            return addExpenseSuccess({ expense });
          }),
          catchError(() => [addExpenseError()])
        )
      )
    )
  );

  // Effect to handle updating an expense
  updateExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateExpense),
      mergeMap((action) =>
        this.expensesService.updateExpense(action.expense).pipe(
          map(() => {
            // Prepare an updated expense object with changes for NGRX entity
            const updatedExpense: Update<Expense> = {
              id: action.expense.id ? action.expense.id : -1, // Use a placeholder ID if not available
              changes: {
                ...action.expense, // Apply all changes to the expense object
              },
            };
            return updateExpenseSuccess({ expense: updatedExpense });
          }),
          catchError(() => [addExpenseError()])
        )
      )
    )
  );

  // Effect to handle fetching all expenses
  getAllExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllExpenses),
      mergeMap(({ page, limit }) =>
        this.expensesService.getAllExpenses(page, limit).pipe(
          map((payload) =>
            getAllExpensesSuccess({
              expenses: payload.items, // Extract expenses from the payload
              count: payload.count, // Extract the total count of expenses
            })
          ),
          catchError(() => [getAllExpensesError()])
        )
      )
    )
  );
}
