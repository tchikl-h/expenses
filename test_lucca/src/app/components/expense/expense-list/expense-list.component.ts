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
        // Handle save changes event here
        console.log('Updated expense:', updatedExpense);
      }
    );

    dialogRef.componentInstance.cancelEditEvent.subscribe(() => {
      // Handle cancel edit event here
      console.log('Edit canceled');
    });
  }
}
