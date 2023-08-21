import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule, provideStore } from '@ngrx/store';
import { ExpenseComponent } from './components/expense/expense.component';
import { EffectsModule } from '@ngrx/effects';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { expensesReducers } from './store/expenses';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpensesEffects } from './store/expenses/expenses.effects';

@NgModule({
  declarations: [AppComponent, ExpenseComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatPaginatorModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
