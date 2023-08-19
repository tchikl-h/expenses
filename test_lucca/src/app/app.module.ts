import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './expense/list/list.component';
import { AddComponent } from './expense/add/add.component';
import { EditComponent } from './expense/edit/edit.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent, ListComponent, AddComponent, EditComponent],
  imports: [BrowserModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
