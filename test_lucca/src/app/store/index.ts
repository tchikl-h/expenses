// file location: store/index.ts
import { ExpensesState } from './expenses';

export interface AppState {
  expenses?: ExpensesState;
}
