import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationsLinksComponent } from './navigations-links.component';

describe('NavigationsLinksComponent', () => {
  let component: NavigationsLinksComponent;
  let fixture: ComponentFixture<NavigationsLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationsLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
