import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailDialogComponent } from './event-detail-dialog.component';


describe('DialogComponent', () => {
  let component: EventDetailDialogComponent;
  let fixture: ComponentFixture<EventDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
