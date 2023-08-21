import { Component, inject, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExpensesFacade } from '../../store/expenses';
import { selectExpenses } from '../../store/expenses';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.sass'],
})
export class ExpenseComponent implements OnInit {
  private readonly expensesFacade: ExpensesFacade = inject(ExpensesFacade);
  expenses$: Observable<Expense[]>;

  constructor(private store: Store) {
    this.expensesFacade.getAll();
    this.expenses$ = this.store.select(selectExpenses);
  }

  addExpense(): void {
    // let expense: Expense = {
    //   id: 91,
    //   nature: ExpenseNature.Restaurant,
    //   amount: 75,
    //   comment: 'At nihil occaecati dix.',
    //   purchasedOn: '2022-11-14',
    //   invites: 1,
    // };
    // this.expensesFacade.updateExpense(expense);
  }

  ngOnInit(): void {
    this.addExpense();
  }
}
