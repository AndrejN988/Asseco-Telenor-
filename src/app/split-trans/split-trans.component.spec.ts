import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitTransComponent } from './split-trans.component';

describe('SplitTransComponent', () => {
  let component: SplitTransComponent;
  let fixture: ComponentFixture<SplitTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitTransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
