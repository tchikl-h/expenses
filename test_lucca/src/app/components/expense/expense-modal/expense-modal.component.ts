import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.sass'],
})
export class ExpenseModalComponent {
  editedExpense: Expense;
  @Output() saveChangesEvent = new EventEmitter<Expense>();
  @Output() cancelEditEvent = new EventEmitter<void>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.editedExpense = JSON.parse(JSON.stringify(data.editedExpense));
  }

  saveChanges() {
    this.saveChangesEvent.emit(this.editedExpense);
  }

  cancelEdit() {
    this.cancelEditEvent.emit();
  }
}
