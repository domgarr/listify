import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListsPageComponent } from './task-lists-page.component';

describe('TaskListsPageComponent', () => {
  let component: TaskListsPageComponent;
  let fixture: ComponentFixture<TaskListsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
