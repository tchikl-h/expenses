import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.editedExpense = JSON.parse(JSON.stringify(data.editedExpense));
  }

  saveChanges() {
    this.saveChangesEvent.emit(this.editedExpense);
  }

  cancelEdit() {
    this.cancelEditEvent.emit();
  }

  formatDatePickerValue(date: Date): string {
    if (date) {
      return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }
    return '';
  }
}
