import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.sass'],
})
export class ExpenseListComponent {
  @Input() expenses: Expense[] | null;

  constructor(private modal: MatDialog) {}

  openModal(expense: Expense) {
    this.modal.open(ExpenseModalComponent, {
      data: {
        comment: expense.comment,
      },
    });
  }
}
