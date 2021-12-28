import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalerrorComponent } from './internalerror.component';

describe('InternalerrorComponent', () => {
  let component: InternalerrorComponent;
  let fixture: ComponentFixture<InternalerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalerrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
