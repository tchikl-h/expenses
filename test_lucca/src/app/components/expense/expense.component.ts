import { Component, inject, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { ExpensesFacade, selectTotalExpenses } from '../../store/expenses';
import { selectExpenses } from '../../store/expenses';
import { PageEvent } from '@angular/material/paginator';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.sass'],
})
export class ExpenseComponent implements OnInit {
  private readonly expensesFacade: ExpensesFacade = inject(ExpensesFacade);
  page$: BehaviorSubject<number> = new BehaviorSubject(0);
  limit$: BehaviorSubject<number> = new BehaviorSubject(20);
  expenses$: Observable<Expense[]>;
  totalExpenses$: Observable<number>;
  pageAndLimit$ = combineLatest([this.page$, this.limit$]).pipe(
    distinctUntilChanged(([prevPage, prevLimit], [newPage, newLimit]) => {
      return prevPage === newPage && prevLimit === newLimit;
    })
  );

  constructor(private store: Store) {
    this.pageAndLimit$.subscribe(([page, limit]) => {
      this.expensesFacade.getAll(page, limit);
    });
    this.expenses$ = this.store.select(selectExpenses);
    this.totalExpenses$ = this.store.select(selectTotalExpenses);
  }

  onPageChange(event: PageEvent) {
    const newLimit = event.pageSize;
    if (newLimit !== this.limit$.getValue()) {
      this.limit$.next(newLimit);
      this.page$.next(0); // Reset page to 0 when limit changes
    } else {
      this.page$.next(event.pageIndex);
    }
  }

  addExpense(): void {
    // let expense: Expense = {
    //   id: 91,
    //   nature: ExpenseNature.Restaurant,
    //   amount: 75,
    //   comment: 'At nihil occaecati dix.',
    //   purchasedOn: '2022-11-14',
    //   invites: 1,
    // };
    // this.expensesFacade.updateExpense(expense);
  }

  ngOnInit(): void {
    this.addExpense();
  }
}
