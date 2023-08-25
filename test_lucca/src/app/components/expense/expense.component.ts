import { Component, OnDestroy } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ModalService } from 'src/app/services/modal.service';
import { defaultExpense } from 'src/app/shared/constants';
import { ExpensesFacade } from '../../store/expense/expense.facade';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.sass'],
})
export class ExpenseComponent implements OnDestroy {
  // Flags to track if a new expense is being created
  isCreation: boolean;

  // Default expense used for creating new expenses
  defaultExpense: Expense = defaultExpense;

  // Subject to hold the selected expense
  selectedExpense: Subject<Expense> = new Subject<Expense>();

  // Subject to track component destruction
  destroyed = new Subject();

  // Behavior subjects for page and limit
  page$: BehaviorSubject<number> = new BehaviorSubject(0);
  limit$: BehaviorSubject<number> = new BehaviorSubject(5);

  // Observable for expenses and totalExpenses
  expenses$: Observable<Expense[]>;
  totalExpenses$: Observable<number>;

  // Combining page and limit behavior subjects into one observable
  pageAndLimit$ = combineLatest([this.page$, this.limit$]).pipe(
    distinctUntilChanged(([prevPage, prevLimit], [newPage, newLimit]) => {
      return prevPage === newPage && prevLimit === newLimit;
    })
  );

  constructor(
    private modalService: ModalService,
    private expensesFacade: ExpensesFacade
  ) {
    // Subscribe to pageAndLimit$ observable to fetch expenses
    this.pageAndLimit$
      .pipe(takeUntil(this.destroyed))
      .subscribe(([page, limit]) => {
        this.expensesFacade.getAll(page, limit);
      });

    // Selecting expenses and totalExpenses from store using ExpensesFacade
    this.expenses$ = this.expensesFacade.expenses$;
    this.totalExpenses$ = this.expensesFacade.totalExpenses$;
  }

  ngOnDestroy(): void {
    // Completing the destruction subject to prevent memory leaks
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  // Method to handle page changes
  onPageChange(limit: number, page: number) {
    if (limit !== this.limit$.getValue()) {
      // Update limit and reset page when limit changes
      this.limit$.next(limit);
    } else {
      // Update page when page index changes
      this.page$.next(page);
    }
  }

  // Method to handle clicking the "Add" button
  onAddButtonClick(): void {
    this.isCreation = true;
    this.selectedExpense.next({ ...this.defaultExpense });
    this.modalService.openModal();
  }

  // Method to save changes to an expense
  saveChanges(expense: Expense) {
    if (this.isCreation) {
      this.expensesFacade.addExpense(expense);
      this.page$.next(0);
    } else {
      this.expensesFacade.updateExpense(expense);
    }
    this.modalService.closeModal();
  }

  // Method to handle selecting an expense for editing
  onExpenseSelected(expense: Expense) {
    this.isCreation = false;
    this.selectedExpense.next({ ...expense });
    this.modalService.openModal();
  }
}
