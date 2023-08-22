import { Component, Input, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import { ExpensesFacade } from 'src/app/store/expenses';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.sass'],
})
export class ExpenseListComponent implements OnDestroy {
  // Subject to track component destruction
  destroyed = new Subject();

  // Using Angular's inject function to access ExpensesFacade
  private readonly expensesFacade: ExpensesFacade = inject(ExpensesFacade);

  // Input property for passing expenses data to the component
  @Input() expenses: Expense[] | null;

  // Currently selected expense
  expense: Expense;

  constructor(private modal: MatDialog) {}

  ngOnDestroy(): void {
    // Completing the destruction subject
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  // Open the modal for editing an expense
  openModal(expense: Expense) {
    // Open the expense modal and pass data
    const dialogRef = this.modal.open(ExpenseModalComponent, {
      data: {
        expense,
      },
    });

    // Handle saveChangesEvent from the modal
    dialogRef.componentInstance.saveChangesEvent
      .pipe(takeUntil(this.destroyed))
      .subscribe((updatedExpense: Expense) => {
        // Update the expense using the facade and close the modal
        this.expensesFacade.updateExpense(updatedExpense);
        this.modal.closeAll();
      });

    // Handle cancelEditEvent from the modal
    dialogRef.componentInstance.cancelEditEvent
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        // Close the modal
        this.modal.closeAll();
      });
  }
}
