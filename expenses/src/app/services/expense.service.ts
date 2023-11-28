import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, ExpenseDTO } from '../models/expense';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExpensesService {
  // Injecting the HttpClient service
  private readonly http: HttpClient = inject(HttpClient);

  // Getting the API URL and setting other properties
  private readonly apiUrl: string = environment['API_URL'] || '';
  private readonly expenseKey: string = 'expenses';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // Method to add an expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(
      `${this.apiUrl}/${this.expenseKey}`,
      expense,
      {
        headers: this.headers,
      }
    );
  }

  // Method to update an expense
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(
      `${this.apiUrl}/${this.expenseKey}/${expense.id}`,
      expense,
      {
        headers: this.headers,
      }
    );
  }

  // Method to fetch all expenses with pagination
  getAllExpenses(page: number, limit: number): Observable<ExpenseDTO> {
    const params = new HttpParams().set('page', page + 1).set('limit', limit);
    return this.http.get<ExpenseDTO>(`${this.apiUrl}/${this.expenseKey}`, {
      params,
    });
  }
}
