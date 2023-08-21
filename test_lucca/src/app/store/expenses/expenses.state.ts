import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Expense } from '../../models/expense';

export interface ExpensesState extends EntityState<Expense> {
  loading: [];
}

export const adapter: EntityAdapter<Expense> = createEntityAdapter();

export const initialState: ExpensesState = adapter.getInitialState({
  loading: [],
});