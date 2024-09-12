import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormroleviewComponent } from './formroleview.component';

describe('FormroleviewComponent', () => {
  let component: FormroleviewComponent;
  let fixture: ComponentFixture<FormroleviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormroleviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormroleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
