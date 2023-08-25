import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule, provideStore } from '@ngrx/store';
import { ExpenseComponent } from './components/expense/expense.component';
import { EffectsModule } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { expensesReducers } from './store/expenses';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpensesEffects } from './store/expenses/expenses.effects';
import { ExpenseListComponent } from './components/expense/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense/expense-form/expense-form.component';
import { DatePipe } from '@angular/common';
import { ExpenseListSkeletonComponent } from './components/expense/expense-list/expense-list-skeleton/expense-list-skeleton.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ModalComponent } from './components/modal/modal.component';
import { ExpensesFacade } from './store/expense/expense.facade';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    ExpenseListComponent,
    ExpenseFormComponent,
    ExpenseListSkeletonComponent,
    PaginatorComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([ExpensesEffects]),
  ],
  providers: [
    provideStore({ expenses: expensesReducers }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    DatePipe,
    ExpensesFacade,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
