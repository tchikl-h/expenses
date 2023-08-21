import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from 'src/app/models/expense';
import { addExpense, getAllExpenses, updateExpense } from './expenses.actions';
import { selectExpenses } from './expenses.selectors';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpensesFacade {
  private readonly store: Store = inject(Store);

  readonly expenses$: Observable<Expense[]> = this.store.select(selectExpenses);

  addExpense(expense: Expense): void {
    this.store.dispatch(addExpense({ expense }));
  }

  updateExpense(expense: Expense): void {
    this.store.dispatch(updateExpense({ expense }));
  }

  getAll(): void {
    this.store.dispatch(getAllExpenses());
  }
}
