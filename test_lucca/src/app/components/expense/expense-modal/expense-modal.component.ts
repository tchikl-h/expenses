import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { ModalData } from '../../../models/modalData';
import { defaultExpense } from 'src/app/shared/constants';
import { ExpenseNature } from 'src/app/models/expenseNature';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.sass'],
})
export class ExpenseModalComponent {
  expense: Expense;
  @Output() saveChangesEvent = new EventEmitter<Expense>();
  @Output() cancelEditEvent = new EventEmitter<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private datePipe: DatePipe
  ) {
    if (data) {
      this.expense = { ...data.expense };
    } else {
      this.expense = { ...defaultExpense };
    }
  }

  saveChanges() {
    this.updateExpensePropertiesBasedOnNature();
    this.saveChangesEvent.emit(this.expense);
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

  updateExpensePropertiesBasedOnNature() {
    if (this.expense.nature === ExpenseNature.Restaurant) {
      delete this.expense.distance;
    } else if (this.expense.nature === ExpenseNature.Trip) {
      delete this.expense.invites;
    }
  }
}
