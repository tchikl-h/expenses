import { Component, OnDestroy } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { Store } from '@ngrx/store';
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
  private isCreation: boolean;
  defaultExpense: Expense = defaultExpense;
  selectedExpense: Subject<Expense> = new Subject<Expense>();
  // Subject to track component destruction
  destroyed = new Subject();
  // private expensesFacade: ExpensesFacade;

  // Using Angular's inject function to access ExpensesFacade
  // private readonly expensesFacade: ExpensesFacade = inject(ExpensesFacade);

  // Behavior subjects for page and limit
  page$: BehaviorSubject<number> = new BehaviorSubject(0);
  limit$: BehaviorSubject<number> = new BehaviorSubject(5);

  // Observable for expenses and totalExpenses
  expenses$: Observable<Expense[]>;
  totalExpenses$: Observable<number>;

  // Tracking whenever page and limit changes
  pageAndLimit$ = combineLatest([this.page$, this.limit$]).pipe(
    distinctUntilChanged(([prevPage, prevLimit], [newPage, newLimit]) => {
      return prevPage === newPage && prevLimit === newLimit;
    })
  );

  constructor(
    private store: Store,
    private modalService: ModalService,
    private expensesFacade: ExpensesFacade
  ) {
    // this.expensesFacade = new ExpensesFacade(expensesService);
    // Subscribe to pageAndLimit$ observable to fetch expenses
    this.pageAndLimit$
      .pipe(takeUntil(this.destroyed))
      .subscribe(([page, limit]) => {
        this.expensesFacade.getAll(page, limit);
      });

    // Selecting expenses and totalExpenses from store
    this.expenses$ = this.expensesFacade.expenses$;
    this.totalExpenses$ = this.expensesFacade.totalExpenses$;
  }

  ngOnDestroy(): void {
    // Completing the destruction subject
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onPageChange(limit: number, page: number) {
    if (limit !== this.limit$.getValue()) {
      // Update limit and reset page when limit changes
      this.limit$.next(limit);
      this.page$.next(0);
    } else {
      // Update page when page index changes
      this.page$.next(page);
    }
  }

  onAddButtonClick(): void {
    this.isCreation = true;
    this.selectedExpense.next({ ...defaultExpense });
    this.modalService.openModal();
  }

  saveChanges(expense: Expense) {
    if (this.isCreation) {
      this.expensesFacade.addExpense(expense);
      this.page$.next(0);
    } else {
      this.expensesFacade.updateExpense(expense);
    }
    this.modalService.closeModal();
  }

  onExpenseSelected(expense: Expense) {
    this.isCreation = false;
    this.selectedExpense.next({ ...expense });
    this.modalService.openModal();
  }
}
