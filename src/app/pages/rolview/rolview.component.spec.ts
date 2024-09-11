import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolviewComponent } from './rolview.component';

describe('RolviewComponent', () => {
  let component: RolviewComponent;
  let fixture: ComponentFixture<RolviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
