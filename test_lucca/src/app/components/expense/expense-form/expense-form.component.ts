import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseNature } from 'src/app/models/expenseNature';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.sass'],
})
export class ExpenseFormComponent {
  ExpenseNature = ExpenseNature;
  // The current expense being edited
  @Input() expense: Expense;

  // EventEmitter for saving changes and canceling edit
  @Output() saveChangesEvent = new EventEmitter<Expense>();

  // Save changes to the expense and emit the event
  saveChanges() {
    // Update expense properties based on nature before saving
    this.updateExpensePropertiesBasedOnNature();
    // Emit the event with the updated expense
    this.saveChangesEvent.emit(this.expense);
  }

  // Update expense properties based on its nature
  updateExpensePropertiesBasedOnNature() {
    if (this.expense.nature === ExpenseNature.Restaurant) {
      delete this.expense.distance; // Remove distance for restaurant expenses
    } else if (this.expense.nature === ExpenseNature.Trip) {
      delete this.expense.invites; // Remove invites for trip expenses
    }
  }

  changeNature(nature: ExpenseNature) {
    this.expense.nature = nature;
  }

  isFormValid() {
    const requiredFields: Record<ExpenseNature, string[]> = {
      [ExpenseNature.Restaurant]: ['amount', 'purchasedOn', 'invites'],
      [ExpenseNature.Trip]: ['amount', 'purchasedOn', 'distance'],
    };

    const fieldsToCheck = requiredFields[this.expense.nature];

    if (!fieldsToCheck) {
      return false;
    }

    return fieldsToCheck.every(
      (field) => !!this.expense[field as keyof Expense]
    );
  }

  handleInputChange(event: Event, field: string) {
    const inputValue = (event.target as HTMLInputElement).value;

    switch (field) {
      case 'invites':
        this.expense.invites = parseInt(inputValue, 10);
        break;
      case 'distance':
        this.expense.distance = parseInt(inputValue, 10);
        break;
      case 'amount':
        this.expense.amount = parseInt(inputValue, 10);
        break;
      case 'comment':
        this.expense.comment = inputValue;
        break;
      case 'purchasedOn':
        this.expense.purchasedOn = inputValue;
        break;
      default:
        break;
    }
  }
}
