import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.sass'],
})
export class ExpenseListComponent implements OnDestroy {
  // Subject to track component destruction
  destroyed = new Subject();

  // Using Angular's inject function to access ExpensesFacade
  @Output() expenseSelected = new EventEmitter<Expense>();

  // Input property for passing expenses data to the component
  @Input() expenses: Expense[] | null;

  constructor(private modal: MatDialog) {}

  ngOnDestroy(): void {
    // Completing the destruction subject
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  clickExpense(expense: Expense) {
    this.expenseSelected.emit(expense);
  }
}
