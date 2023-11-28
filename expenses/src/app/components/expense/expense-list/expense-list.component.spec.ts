import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExpenseListComponent } from './expense-list.component';
import { Expense } from 'src/app/models/expense';
import { ExpenseNature } from 'src/app/models/expenseNature';

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit expense when clicked', () => {
    const expense: Expense = {
      id: 1,
      nature: ExpenseNature.Restaurant,
      amount: 50,
      invites: 4,
      purchasedOn: '',
      comment: 'Dinner with friends',
    };
    spyOn(component.expenseSelected, 'emit');

    component.clickExpense(expense);

    expect(component.expenseSelected.emit).toHaveBeenCalledWith(expense);
  });

  it('should display expenses correctly', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        nature: ExpenseNature.Restaurant,
        amount: 50,
        invites: 4,
        purchasedOn: '',
        comment: 'Dinner with friends',
      },
      {
        id: 2,
        nature: ExpenseNature.Trip,
        amount: 100,
        distance: 300,
        purchasedOn: '',
        comment: 'Weekend trip',
      },
    ];

    component.expenses = expenses;
    fixture.detectChanges();

    const expenseItems = fixture.debugElement.queryAll(By.css('.expense-item'));
    expect(expenseItems.length).toBe(expenses.length);

    // Test other elements and attributes within the expense items
    const expenseDetails = expenseItems[0].query(By.css('.expense-details'));
    expect(expenseDetails.nativeElement.textContent).toContain('$ 50');
  });

  it('should display expense details based on nature', () => {
    const expense: Expense = {
      id: 1,
      nature: ExpenseNature.Restaurant,
      amount: 50,
      invites: 4,
      purchasedOn: '',
      comment: 'Dinner with friends',
    };

    component.expenses = [expense];
    fixture.detectChanges();

    const expenseInvites = fixture.debugElement.query(
      By.css('.expense-invites')
    );
    expect(expenseInvites.nativeElement.textContent).toContain('Invites: 4');
  });

  it('should not display distance if nature is restaurant', () => {
    const expense: Expense = {
      id: 1,
      nature: ExpenseNature.Restaurant,
      amount: 50,
      invites: 4,
      purchasedOn: '',
      comment: 'Dinner with friends',
    };

    component.expenses = [expense];
    fixture.detectChanges();

    const expenseDistance = fixture.debugElement.query(
      By.css('.expense-distance')
    );
    expect(expenseDistance).toBeNull();
  });

  it('should not display invites if nature is trip', () => {
    const expense: Expense = {
      id: 1,
      nature: ExpenseNature.Trip,
      amount: 100,
      distance: 300,
      purchasedOn: '',
      comment: 'Weekend trip',
    };

    component.expenses = [expense];
    fixture.detectChanges();

    const expenseInvites = fixture.debugElement.query(
      By.css('.expense-invites')
    );
    expect(expenseInvites).toBeNull();
  });

  it('should display correct date format', () => {
    const expense: Expense = {
      id: 1,
      nature: ExpenseNature.Restaurant,
      amount: 50,
      invites: 4,
      purchasedOn: '2023-08-25',
      comment: 'Dinner with friends',
    };

    component.expenses = [expense];
    fixture.detectChanges();

    const expenseDate = fixture.debugElement.query(By.css('.expense-date'));
    expect(expenseDate.nativeElement.textContent).toContain('Aug 25, 2023');
  });
});
