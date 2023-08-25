import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [DatePipe, ExpensesFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
