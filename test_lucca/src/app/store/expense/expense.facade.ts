import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Expense } from 'src/app/models/expense';
import { ExpensesService } from 'src/app/services/expense.service';
import {
  addExpenseAction,
  getExpensesAction,
  updateExpenseAction,
} from './expense.actions';
import { StoreComponent } from './expense.store';

@Injectable()
export class ExpensesFacade {
  private store: StoreComponent;
  expenses$: Observable<Expense[]>;
  totalExpenses$: Observable<number>;

  constructor(private expensesService: ExpensesService) {
    this.store = new StoreComponent(expensesService);
    this.expenses$ = this.store.state$.pipe(map((state) => state.expenses));
    this.totalExpenses$ = this.store.state$.pipe(map((state) => state.count));
  }

  addExpense(expense: Expense): void {
    this.store.dispatch(addExpenseAction(expense));
  }

  updateExpense(expense: Expense): void {
    this.store.dispatch(updateExpenseAction(expense));
  }

  getAll(page: number, limit: number): void {
    this.store.dispatch(getExpensesAction(page, limit));
  }
}
