import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { initialState, ExpensesState, state } from './expense.state';
import { ExpenseActions } from './expense.actions';
import { dispatchActionInsideReducer } from './expense.reducers';
import { ExpensesService } from 'src/app/services/expense.service';
import { ExpensesEffects } from './expense.effects';

export class Store {
  private expensesEffects: ExpensesEffects;
  private readonly actions$: Subject<ExpenseActions> =
    new Subject<ExpenseActions>();
  public stateSubject: BehaviorSubject<ExpensesState> =
    new BehaviorSubject<ExpensesState>(initialState);
  public state$: Observable<ExpensesState> = this.stateSubject.asObservable();

  constructor(private expensesService: ExpensesService) {
    this.stateSubject.next(state);
    this.expensesEffects = new ExpensesEffects(expensesService, this.actions$);

    this.expensesEffects.addExpense$
      .pipe(tap((action) => this.dispatchAction(action)))
      .subscribe();
    this.expensesEffects.updateExpense$
      .pipe(tap((action) => this.dispatchAction(action)))
      .subscribe();
    this.expensesEffects.getExpenses$
      .pipe(tap((action) => this.dispatchAction(action)))
      .subscribe();
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

// export const store = new Store(expensesService);
