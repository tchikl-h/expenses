import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit correct page change event on previous button click', () => {
    spyOn(component.handlePageChange, 'emit');
    component.length = 100;
    component.pageSize = 10;
    component.pageIndex = 2;

    component.onPageChange(10, 1);

    expect(component.handlePageChange.emit).toHaveBeenCalledWith({
      limit: 10,
      page: 1,
    });
  });

  it('should emit correct page change event on next button click', () => {
    spyOn(component.handlePageChange, 'emit');
    component.length = 100;
    component.pageSize = 10;
    component.pageIndex = 2;

    component.onPageChange(10, 3);

    expect(component.handlePageChange.emit).toHaveBeenCalledWith({
      limit: 10,
      page: 3,
    });
  });

  it('should calculate last page correctly', () => {
    component.length = 100;
    component.pageSize = 10;

    expect(component.getLastPage()).toBe(9);
  });

  // You can add more tests for various scenarios here
});
