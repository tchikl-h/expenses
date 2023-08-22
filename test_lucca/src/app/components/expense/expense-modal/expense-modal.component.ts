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
  // The current expense being edited
  expense: Expense;

  // EventEmitter for saving changes and canceling edit
  @Output() saveChangesEvent = new EventEmitter<Expense>();
  @Output() cancelEditEvent = new EventEmitter<void>();

  constructor(
    // Injecting data passed to the modal and DatePipe for formatting
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private datePipe: DatePipe
  ) {
    // Initialize the expense based on the passed data or default values
    if (data) {
      this.expense = { ...data.expense };
    } else {
      this.expense = { ...defaultExpense };
    }
  }

  // Save changes to the expense and emit the event
  saveChanges() {
    // Update expense properties based on nature before saving
    this.updateExpensePropertiesBasedOnNature();
    // Emit the event with the updated expense
    this.saveChangesEvent.emit(this.expense);
  }

  // Cancel the editing and emit the event
  cancelEdit() {
    this.cancelEditEvent.emit();
  }

  // Format the date value for the date picker
  formatDatePickerValue(date: Date): string {
    if (date) {
      return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }
    return '';
  }

  // Update expense properties based on its nature
  updateExpensePropertiesBasedOnNature() {
    if (this.expense.nature === ExpenseNature.Restaurant) {
      delete this.expense.distance; // Remove distance for restaurant expenses
    } else if (this.expense.nature === ExpenseNature.Trip) {
      delete this.expense.invites; // Remove invites for trip expenses
    }
  }
}
