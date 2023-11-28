import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseComponent } from './expense.component';
import { ModalService } from 'src/app/services/modal.service';
import { ExpensesFacade } from '../../store/expense/expense.facade';
import { By } from '@angular/platform-browser';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ModalComponent } from '../modal/modal.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseListSkeletonComponent } from './expense-list/expense-list-skeleton/expense-list-skeleton.component';

describe('ModalComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;
  let modalService: ModalService;

  const mockExpensesFacade = {
    // ... Your mocked expensesFacade ...
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExpenseComponent,
        PaginatorComponent, // Declare the app-paginator component
        ModalComponent,
        ExpenseFormComponent,
        ExpenseListSkeletonComponent,
      ],
      providers: [
        {
          provide: ModalService,
          useValue: {
            openModal: jasmine.createSpy('openModal'),
            closeModal: jasmine.createSpy('closeModal'),
          },
        },
        { provide: ExpensesFacade, useValue: mockExpensesFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseComponent],
      providers: [ModalService],
    });

    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show modal content when showModal is false', () => {
    fixture.detectChanges();
    const modalContent = fixture.debugElement.query(By.css('.modal-content'));
    expect(modalContent).toBeFalsy();
  });

  it('should open the modal when onAddButtonClick is called', () => {
    spyOn(modalService, 'openModal');
    component.onAddButtonClick();
    expect(modalService.openModal).toHaveBeenCalled();
  });
});
