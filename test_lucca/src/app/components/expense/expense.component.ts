import { Component, OnDestroy, inject } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { ExpensesFacade, selectTotalExpenses } from '../../store/expenses';
import { selectExpenses } from '../../store/expenses';
import { PageEvent } from '@angular/material/paginator';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseModalComponent } from './expense-modal/expense-modal.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.sass'],
})
export class ExpenseComponent implements OnDestroy {
  // Subject to track component destruction
  destroyed = new Subject();

  // Using Angular's inject function to access ExpensesFacade
  private readonly expensesFacade: ExpensesFacade = inject(ExpensesFacade);

  // Behavior subjects for page and limit
  page$: BehaviorSubject<number> = new BehaviorSubject(0);
  limit$: BehaviorSubject<number> = new BehaviorSubject(20);

  // Observable for expenses and totalExpenses
  expenses$: Observable<Expense[]>;
  totalExpenses$: Observable<number>;

  // Tracking whenever page and limit changes
  pageAndLimit$ = combineLatest([this.page$, this.limit$]).pipe(
    distinctUntilChanged(([prevPage, prevLimit], [newPage, newLimit]) => {
      return prevPage === newPage && prevLimit === newLimit;
    })
  );

  constructor(private store: Store, private modal: MatDialog) {
    // Subscribe to pageAndLimit$ observable to fetch expenses
    this.pageAndLimit$
      .pipe(takeUntil(this.destroyed))
      .subscribe(([page, limit]) => {
        this.expensesFacade.getAll(page, limit);
      });

    // Selecting expenses and totalExpenses from store
    this.expenses$ = this.store.select(selectExpenses);
    this.totalExpenses$ = this.store.select(selectTotalExpenses);
  }

  ngOnDestroy(): void {
    // Completing the destruction subject
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onPageChange(event: PageEvent) {
    const newLimit = event.pageSize;
    if (newLimit !== this.limit$.getValue()) {
      // Update limit and reset page when limit changes
      this.limit$.next(newLimit);
      this.page$.next(0);
    } else {
      // Update page when page index changes
      this.page$.next(event.pageIndex);
    }
  }

  onAddButtonClick(): void {
    this.openModal();
  }

  openModal() {
    // Open the expense modal and handle events
    const dialogRef = this.modal.open(ExpenseModalComponent);

    // When modal save click, we add the expense
    dialogRef.componentInstance.saveChangesEvent
      .pipe(takeUntil(this.destroyed))
      .subscribe((newExpense: Expense) => {
        this.expensesFacade.addExpense(newExpense);
        this.modal.closeAll();
      });

    // When modal cancel click, we close the modal
    dialogRef.componentInstance.cancelEditEvent
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.modal.closeAll();
      });
  }
}
