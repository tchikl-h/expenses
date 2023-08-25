import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { initialState, ExpensesState, state } from './expense.state';
import { ExpenseActions } from './expense.actions';
import { dispatchActionInsideReducer } from './expense.reducers';
import { ExpensesService } from 'src/app/services/expense.service';
import { ExpensesEffects } from './expense.effects';
import { Component, OnDestroy } from '@angular/core';

@Component({
  template: '',
})
export class Store implements OnDestroy {
  private expensesEffects: ExpensesEffects;
  private readonly actions$: Subject<ExpenseActions> =
    new Subject<ExpenseActions>();
  public stateSubject: BehaviorSubject<ExpensesState> =
    new BehaviorSubject<ExpensesState>(initialState);
  public state$: Observable<ExpensesState> = this.stateSubject.asObservable();
  // Subject to track component destruction
  destroyed = new Subject();

  constructor(private expensesService: ExpensesService) {
    this.stateSubject.next(state);
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

  ngOnDestroy(): void {
    // Completing the destruction subject
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  dispatchAction(action: ExpenseActions): void {
    const dispatch = dispatchActionInsideReducer(action);
    this.stateSubject.next(dispatch(this.stateSubject.value, action));
  }

  dispatch(action: ExpenseActions): void {
    this.dispatchAction(action);
    this.actions$.next(action);
  }
}
