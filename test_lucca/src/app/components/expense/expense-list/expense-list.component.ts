import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
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

  // Output event emitter to notify the parent component about the selected expense
  @Output() expenseSelected = new EventEmitter<Expense>();

  // Input property to receive an array of expenses from the parent component
  @Input() expenses: Expense[] | null;

  // Method called when the component is being destroyed
  ngOnDestroy(): void {
    // Completing the destruction subject to prevent memory leaks
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  // Method triggered when an expense is clicked
  clickExpense(expense: Expense) {
    this.expenseSelected.emit(expense);
  }
}
