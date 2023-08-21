import { AppState } from '../index';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ExpensesState } from './expenses.state';
import { Expense } from 'src/app/models/expense';

export const selectExpensesFeature: MemoizedSelector<AppState, ExpensesState> =
  createFeatureSelector<ExpensesState>('expenses');

export const selectExpenses: MemoizedSelector<AppState, Expense[]> =
  createSelector(
    selectExpensesFeature,
    ({ entities }: ExpensesState): Expense[] =>
      Object.values(entities) as Expense[]
  );
