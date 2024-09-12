import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcountryComponent } from './formcountry.component';

describe('FormcountryComponent', () => {
  let component: FormcountryComponent;
  let fixture: ComponentFixture<FormcountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormcountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
