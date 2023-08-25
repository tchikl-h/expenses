import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import { ModalComponent } from "./modal.component";
import { ModalService } from "src/app/services/modal.service";
import { By } from "@angular/platform-browser";

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [ModalService],
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should close the modal when onCloseModal is called", () => {
    spyOn(modalService, "closeModal");
    component.onCloseModal();
    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it("should emit cancelEditEvent when onCloseModal is called", () => {
    spyOn(component.cancelEditEvent, "emit");
    component.onCloseModal();
    expect(component.cancelEditEvent.emit).toHaveBeenCalled();
  });

  it("should stop propagation when onContentClick is called", () => {
    const eventMock = jasmine.createSpyObj("Event", ["stopPropagation"]);
    component.onContentClick(eventMock);
    expect(eventMock.stopPropagation).toHaveBeenCalled();
  });

  it("should show modal content when showModal is true", () => {
    component.showModal = true;
    fixture.detectChanges();
    const modalContent = fixture.debugElement.query(By.css(".modal-content"));
    expect(modalContent).toBeTruthy();
  });

  it("should not show modal content when showModal is false", () => {
    component.showModal = false;
    fixture.detectChanges();
    const modalContent = fixture.debugElement.query(By.css(".modal-content"));
    expect(modalContent).toBeFalsy();
  });

  it("should close the modal when modal background is clicked", fakeAsync(() => {
    spyOn(modalService, "closeModal");
    component.showModal = true;
    fixture.detectChanges();
    const modalBackground = fixture.debugElement.query(
      By.css(".modal-background")
    );
    modalBackground.nativeElement.click();
    tick();
    expect(modalService.closeModal).toHaveBeenCalled();
  }));
});
