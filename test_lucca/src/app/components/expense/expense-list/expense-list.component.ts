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
  destroyed = new Subject();
  private readonly expensesFacade: ExpensesFacade = inject(ExpensesFacade);
  @Input() expenses: Expense[] | null;
  showExpenseForm = false;
  expense: Expense;

  constructor(private modal: MatDialog) {}

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  openModal(expense: Expense) {
    const dialogRef = this.modal.open(ExpenseModalComponent, {
      data: {
        expense,
      },
    });

    dialogRef.componentInstance.saveChangesEvent
      .pipe(takeUntil(this.destroyed))
      .subscribe((updatedExpense: Expense) => {
        this.expensesFacade.updateExpense(updatedExpense);
        this.modal.closeAll();
      });

    dialogRef.componentInstance.cancelEditEvent
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.modal.closeAll();
      });
  }
}
