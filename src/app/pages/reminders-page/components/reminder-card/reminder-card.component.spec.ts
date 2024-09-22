import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderCardComponent } from './reminder-card.component';

describe('ReminderCardComponent', () => {
  let component: ReminderCardComponent;
  let fixture: ComponentFixture<ReminderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
