import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { Expense } from 'src/app/models/expense';
import { ExpensesFacade } from '../../store/expenses';
import { ExpenseModalComponent } from './expense-modal/expense-modal.component';
import { ExpenseComponent } from './expense.component';
import { ExpenseNature } from 'src/app/models/expenseNature';

describe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockExpensesFacade: jasmine.SpyObj<ExpensesFacade>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  const defaultExpense: Expense = {
    id: 18,
    nature: ExpenseNature.Restaurant,
    amount: 577,
    comment: 'Consectetur exercitationem ny. Hey',
    purchasedOn: '2023-07-12',
    invites: 2,
  };

  beforeEach(() => {
    // Create mock instances for testing
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockExpensesFacade = jasmine.createSpyObj('ExpensesFacade', [
      'getAll',
      'addExpense',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

    // Configure testing module with necessary declarations, providers, and imports
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatPaginatorModule],
      declarations: [ExpenseComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ExpensesFacade, useValue: mockExpensesFacade },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    });

    // Create component and fixture instances
    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Assert that the component instance is created successfully
    expect(component).toBeTruthy();
  });

  it('should fetch expenses when page or limit changes', () => {
    // Prepare mock expenses and total expenses count
    const mockExpenses: Expense[] = [defaultExpense];
    const mockTotalExpenses = 1;

    // Configure mockStore to return the mock expenses and total expenses count
    mockStore.select.and.returnValue(of(mockExpenses));
    mockStore.select.and.returnValue(of(mockTotalExpenses));

    // Trigger changes in page and limit
    component.page$.next(1);
    component.limit$.next(10);

    // Verify that the getAll method was called with the expected arguments
    expect(mockExpensesFacade.getAll).toHaveBeenCalledWith(1, 10);

    // Restore mockStore behavior for subsequent calls
    mockStore.select.and.returnValue(of(mockExpenses));
    mockStore.select.and.returnValue(of(mockTotalExpenses));
  });

  it('should change page and limit on onPageChange', () => {
    // Create a mock PageEvent
    const mockPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 25,
      length: 100,
    };

    // Spy on the 'next' methods of page$ and limit$
    spyOn(component.page$, 'next');
    spyOn(component.limit$, 'next');

    // Call the onPageChange method with the mock PageEvent
    component.onPageChange(mockPageEvent);

    // Verify that the 'next' methods were called with the expected arguments
    expect(component.page$.next).toHaveBeenCalledWith(0);
    expect(component.limit$.next).toHaveBeenCalledWith(25);
  });

  it('should open modal and handle saveChangesEvent', () => {
    // Set up a mock dialogRef with necessary properties
    const dialogRef: any = {
      componentInstance: {
        saveChangesEvent: new Subject<Expense>(),
        cancelEditEvent: new Subject<void>(),
      },
      close: jasmine.createSpy('closeAll'),
    };

    // Configure mockMatDialog to return the mock dialogRef
    mockMatDialog.open.and.returnValue(dialogRef);

    // Call the openModal method
    component.openModal();

    // Create a mock new expense
    const mockNewExpense: Expense = defaultExpense;

    // Trigger saveChangesEvent with the mock new expense
    dialogRef.componentInstance.saveChangesEvent.next(mockNewExpense);

    // Verify that the MatDialog's open method was called with the expected argument
    expect(mockMatDialog.open).toHaveBeenCalledWith(ExpenseModalComponent);

    // Verify that the addExpense method was called with the mock new expense
    expect(mockExpensesFacade.addExpense).toHaveBeenCalledWith(mockNewExpense);
  });

  it('should open modal and handle cancelEditEvent', () => {
    // Set up a mock dialogRef with necessary properties
    const dialogRef: any = {
      componentInstance: {
        saveChangesEvent: new Subject<Expense>(),
        cancelEditEvent: new Subject<void>(),
      },
      close: jasmine.createSpy('closeAll'),
    };

    // Configure mockMatDialog to return the mock dialogRef
    mockMatDialog.open.and.returnValue(dialogRef);

    // Call the openModal method
    component.openModal();

    // Trigger cancelEditEvent
    dialogRef.componentInstance.cancelEditEvent.next();

    // Verify that the MatDialog's open method was called with the expected argument
    expect(mockMatDialog.open).toHaveBeenCalledWith(ExpenseModalComponent);
  });

  afterEach(() => {
    // Clean up and destroy the fixture
    fixture.destroy();
  });
});
