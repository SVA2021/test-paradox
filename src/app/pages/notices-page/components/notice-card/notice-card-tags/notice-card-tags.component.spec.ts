import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeCardTagsComponent } from './notice-card-tags.component';

describe('NoticeCardTagsComponent', () => {
  let component: NoticeCardTagsComponent;
  let fixture: ComponentFixture<NoticeCardTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeCardTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeCardTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
