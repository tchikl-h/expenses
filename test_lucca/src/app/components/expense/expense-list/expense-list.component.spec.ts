import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ExpenseListComponent } from './expense-list.component';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import { ExpensesFacade } from 'src/app/store/expenses';
import { Expense } from 'src/app/models/expense';
import { ExpenseNature } from 'src/app/models/expenseNature';
import { DatePipe } from '@angular/common';
import { defaultExpense } from 'src/app/shared/constants';

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;
  let mockExpensesFacade: ExpensesFacade;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockDialogRef: any;
  const mockDatePipe = jasmine.createSpyObj('DatePipe', ['transform']);

  beforeEach(() => {
    // Create mock instances for testing
    mockExpensesFacade = jasmine.createSpyObj('ExpensesFacade', [
      'updateExpense',
    ]);

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    mockDialogRef = {
      componentInstance: {
        saveChangesEvent: new Subject(),
        cancelEditEvent: new Subject(),
      },
      close: jasmine.createSpy('close'),
    };
    mockMatDialog.open.and.returnValue(mockDialogRef);

    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ExpenseListComponent],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ExpensesFacade, useValue: mockExpensesFacade },
        { provide: DatePipe, useValue: mockDatePipe },
      ],
    });

    // Create component and fixture instances
    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Assert that the component instance is created successfully
    expect(component).toBeTruthy();
  });

  it('should open the modal and handle saveChangesEvent', () => {
    // Create a mock expense
    const mockExpense: Expense = {
      id: 18,
      nature: ExpenseNature.Restaurant,
      amount: 576,
      comment: 'Consectetur exercitationem ny.',
      purchasedOn: '2023-07-11',
      invites: 1,
    };

    // Open modal with the mock expense
    component.openModal(mockExpense);

    // Create an updated expense
    const updatedExpense: Expense = {
      ...defaultExpense,
      invites: 2,
    };

    // Trigger saveChangesEvent with the updated expense
    mockDialogRef.componentInstance.saveChangesEvent.next(updatedExpense);

    // Verify that the modal was opened with the correct data
    expect(mockMatDialog.open).toHaveBeenCalledWith(ExpenseModalComponent, {
      data: { expense: mockExpense },
    });

    // Verify that the updateExpense method was called with the updated expense
    expect(mockExpensesFacade.updateExpense).toHaveBeenCalledWith(
      updatedExpense
    );
  });

  it('should open the modal and handle cancelEditEvent', () => {
    // Create a mock expense
    const mockExpense: Expense = {
      id: 18,
      nature: ExpenseNature.Restaurant,
      amount: 576,
      comment: 'Consectetur exercitationem ny.',
      purchasedOn: '2023-07-11',
      invites: 1,
    };

    // Open modal with the mock expense
    component.openModal(mockExpense);

    // Trigger cancelEditEvent
    mockDialogRef.componentInstance.cancelEditEvent.next();

    // Verify that the modal was opened with the correct data
    expect(mockMatDialog.open).toHaveBeenCalledWith(ExpenseModalComponent, {
      data: { expense: mockExpense },
    });

    // Verify that closeAll method was called on the MatDialog instance
    expect(mockMatDialog.closeAll).toHaveBeenCalled();
  });

  it('should complete the destroyed subject on component destruction', () => {
    // Spy on the 'next' and 'complete' methods of the destroyed subject
    spyOn(component.destroyed, 'next');
    spyOn(component.destroyed, 'complete');

    // Call the ngOnDestroy method of the component
    component.ngOnDestroy();

    // Verify that 'next' and 'complete' were called on the destroyed subject
    expect(component.destroyed.next).toHaveBeenCalledWith(true);
    expect(component.destroyed.complete).toHaveBeenCalled();
  });
});
