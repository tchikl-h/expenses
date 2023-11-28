// Importing necessary modules and classes
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { initialState, ExpensesState, state } from './expense.state';
import { ExpenseActions } from './expense.actions';
import { dispatchActionInsideReducer } from './expense.reducers';
import { ExpensesService } from 'src/app/services/expense.service';
import { ExpensesEffects } from './expense.effects';
import { Component, OnDestroy } from '@angular/core';

// Defining an Angular component with an empty template
@Component({
  template: '',
})
export class StoreComponent implements OnDestroy {
  // Private property to hold an instance of ExpensesEffects
  private expensesEffects: ExpensesEffects;

  // Subjects for managing actions and state
  private readonly actions$: Subject<ExpenseActions> =
    new Subject<ExpenseActions>();
  public stateSubject: BehaviorSubject<ExpensesState> =
    new BehaviorSubject<ExpensesState>(initialState);
  public state$: Observable<ExpensesState> = this.stateSubject.asObservable();

  // Subject to track component destruction
  destroyed = new Subject();

  // Constructor for the Store service
  constructor(private expensesService: ExpensesService) {
    // Initializing the stateSubject with an initial state
    this.stateSubject.next(state);

    // Creating an instance of ExpensesEffects and subscribing to its observables
    this.expensesEffects = new ExpensesEffects(expensesService, this.actions$);

    this.expensesEffects.addExpense$
      .pipe(
        takeUntil(this.destroyed),
        tap((action) => this.dispatchAction(action))
      )
      .subscribe();

    this.expensesEffects.updateExpense$
      .pipe(
        takeUntil(this.destroyed),
        tap((action) => this.dispatchAction(action))
      )
      .subscribe();

    this.expensesEffects.getExpenses$
      .pipe(
        takeUntil(this.destroyed),
        tap((action) => this.dispatchAction(action))
      )
      .subscribe();
  }

  // Lifecycle method to handle component destruction
  ngOnDestroy(): void {
    // Completing the destruction subject
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  // Method to dispatch an action and update the state
  dispatchAction(action: ExpenseActions): void {
    const dispatch = dispatchActionInsideReducer(action);
    this.stateSubject.next(dispatch(this.stateSubject.value, action));
  }

  // Method to dispatch an action and emit it to the actions$ subject
  dispatch(action: ExpenseActions): void {
    this.dispatchAction(action);
    this.actions$.next(action);
  }
}
