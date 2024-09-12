import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcityComponent } from './formcity.component';

describe('FormcityComponent', () => {
  let component: FormcityComponent;
  let fixture: ComponentFixture<FormcityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormcityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
