import { Component, inject, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { ExpensesFacade, selectTotalExpenses } from '../../store/expenses';
import { selectExpenses } from '../../store/expenses';
import { PageEvent } from '@angular/material/paginator';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseModalComponent } from './expense-modal/expense-modal.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.sass'],
})
export class ExpenseComponent {
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

  constructor(private store: Store, private modal: MatDialog) {
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

  onAddButtonClick(): void {
    console.log('onAddButtonClick');
    this.openModal();
  }

  openModal() {
    const dialogRef = this.modal.open(ExpenseModalComponent);

    dialogRef.componentInstance.saveChangesEvent.subscribe(
      (newExpense: Expense) => {
        this.expensesFacade.addExpense(newExpense);
        this.modal.closeAll();
      }
    );

    dialogRef.componentInstance.cancelEditEvent.subscribe(() => {
      this.modal.closeAll();
    });
  }
}
