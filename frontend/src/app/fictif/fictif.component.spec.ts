import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FictifComponent } from './fictif.component';

describe('FictifComponent', () => {
  let component: FictifComponent;
  let fixture: ComponentFixture<FictifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FictifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FictifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
