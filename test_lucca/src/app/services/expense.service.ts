import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, ExpenseDTO } from '../models/expense';

@Injectable({ providedIn: 'root' })
export class ExpensesService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'http://localhost:3000/expenses';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}`, expense, {
      headers: this.headers,
    });
  }

  updateExpense(changes: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${changes.id}`, changes, {
      headers: this.headers,
    });
  }

  getAllExpenses(): Observable<ExpenseDTO> {
    return this.http.get<ExpenseDTO>(`${this.apiUrl}`);
  }
}
