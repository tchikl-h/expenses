import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-modal',
  template: `
    <h2 mat-dialog-title>Welcome</h2>
    <mat-dialog-content> Hey, welcome {{ data.comment }}! </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="'close'">Close</button>
    </mat-dialog-actions>
  `,
})
export class ExpenseModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
