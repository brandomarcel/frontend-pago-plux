import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPluxComponent } from './button-plux.component';

describe('ButtonPluxComponent', () => {
  let component: ButtonPluxComponent;
  let fixture: ComponentFixture<ButtonPluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPluxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
