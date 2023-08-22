import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import { ExpensesFacade } from 'src/app/store/expenses';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.sass'],
})
export class ExpenseListComponent {
  private readonly expensesFacade: ExpensesFacade = inject(ExpensesFacade);
  @Input() expenses: Expense[] | null;
  showExpenseForm = false;
  editedExpense: Expense;

  constructor(private modal: MatDialog) {}

  openModal(expense: Expense) {
    const dialogRef = this.modal.open(ExpenseModalComponent, {
      data: {
        editedExpense: expense,
      },
    });

    dialogRef.componentInstance.saveChangesEvent.subscribe(
      (updatedExpense: Expense) => {
        this.expensesFacade.updateExpense(updatedExpense);
        this.modal.closeAll();
      }
    );

    dialogRef.componentInstance.cancelEditEvent.subscribe(() => {
      this.modal.closeAll();
    });
  }
}
