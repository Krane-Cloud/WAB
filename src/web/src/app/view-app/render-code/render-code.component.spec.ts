import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCodeComponent } from './render-code.component';

describe('RenderCodeComponent', () => {
  let component: RenderCodeComponent;
  let fixture: ComponentFixture<RenderCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
