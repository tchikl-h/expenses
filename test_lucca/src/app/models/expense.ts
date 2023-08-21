import { ExpenseNature } from './expenseNature.js';

export interface Expense {
  id?: number;
  amount: number;
  purchasedOn: string;
  comment: string;
  nature: ExpenseNature.Trip | ExpenseNature.Restaurant;
  distance?: number;
  invites?: number;
}

export interface ExpenseDTO {
  items: Expense[];
  count: number;
}
