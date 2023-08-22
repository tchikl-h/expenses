import { Expense } from '../models/expense';
import { ExpenseNature } from '../models/expenseNature';

export const defaultExpense: Expense = {
  nature: ExpenseNature.Restaurant,
  amount: 0,
  comment: '',
  purchasedOn: '',
  invites: 0,
};
