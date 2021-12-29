import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditAppComponent;
  let fixture: ComponentFixture<EditAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
