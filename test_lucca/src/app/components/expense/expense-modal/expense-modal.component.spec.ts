/* eslint-disable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from '../../../models/modalData';
import { ExpenseNature } from 'src/app/models/expenseNature';
import { ExpenseModalComponent } from './expense-modal.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { defaultExpense } from 'src/app/shared/constants';

describe('ExpenseModalComponent', () => {
  let component: ExpenseModalComponent;
  let fixture: ComponentFixture<ExpenseModalComponent>;
  const mockDatePipe = jasmine.createSpyObj('DatePipe', ['transform']);

  beforeEach(async () => {
    // Configure testing module with necessary declarations, providers, and imports
    await TestBed.configureTestingModule({
      declarations: [ExpenseModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: DatePipe, useValue: mockDatePipe },
      ],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    // Set up a mock ModalData to be passed via MAT_DIALOG_DATA
    const mockModalData: ModalData = { expense: defaultExpense };
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: mockModalData });
  });

  beforeEach(() => {
    // Create component and fixture instances
    fixture = TestBed.createComponent(ExpenseModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Assert that the component instance is created successfully
    expect(component).toBeTruthy();
  });

  it('should initialize expense with default values when no data is passed', () => {
    // Trigger change detection to initialize component properties
    fixture.detectChanges();

    // Assert that the initialized expense matches the defaultExpense
    expect(component.expense).toEqual(defaultExpense);
  });

  it('should initialize expense with data passed via MAT_DIALOG_DATA', () => {
    // Trigger change detection to initialize component properties
    fixture.detectChanges();

    // Assert that the initialized expense matches the defaultExpense
    expect(component.expense).toEqual(defaultExpense);
  });

  it('should format date using DatePipe', () => {
    // Create a mock date and set up DatePipe mock behavior
    const mockDate = new Date('2023-08-01');
    mockDatePipe.transform.and.returnValue('formatted date');

    // Call the method to format the date
    const formattedDate = component.formatDatePickerValue(mockDate);

    // Assert that the formatted date matches the expected value
    expect(formattedDate).toEqual('formatted date');

    // Verify that the DatePipe's transform method was called with the correct arguments
    expect(mockDatePipe.transform).toHaveBeenCalledWith(mockDate, 'yyyy-MM-dd');
  });

  it('should update expense properties based on nature', () => {
    // Set up initial expense values
    component.expense = defaultExpense;

    // Call the method to update expense properties
    component.updateExpensePropertiesBasedOnNature();

    // Assert that distance is undefined and invites is 0 for the initial expense
    expect(component.expense.distance).toBeUndefined();
    expect(component.expense.invites).toBe(0);

    // Modify expense nature, distance, and invites
    component.expense.nature = ExpenseNature.Trip;
    component.expense.distance = 100;
    component.expense.invites = 5;

    // Call the method again to update expense properties
    component.updateExpensePropertiesBasedOnNature();

    // Assert that distance is updated and invites is reset for the modified expense
    expect(component.expense.distance).toBe(100);
    expect(component.expense.invites).toBeUndefined();
  });
});
