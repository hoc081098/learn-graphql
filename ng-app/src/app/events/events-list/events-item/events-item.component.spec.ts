import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsItemComponent } from './events-item.component';

describe('EventsItemComponent', () => {
  let component: EventsItemComponent;
  let fixture: ComponentFixture<EventsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
