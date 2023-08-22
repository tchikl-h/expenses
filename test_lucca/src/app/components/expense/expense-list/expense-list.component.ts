import { Component, Input } from '@angular/core';
import { Expense } from 'src/app/models/expense';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.sass'],
})
export class ExpenseListComponent {
  @Input() expenses: Expense[] | null;
}
