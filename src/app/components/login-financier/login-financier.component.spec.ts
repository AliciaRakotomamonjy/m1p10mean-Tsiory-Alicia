import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFinancierComponent } from './login-financier.component';

describe('LoginFinancierComponent', () => {
  let component: LoginFinancierComponent;
  let fixture: ComponentFixture<LoginFinancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFinancierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
