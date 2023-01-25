import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAtelierComponent } from './login-atelier.component';

describe('LoginAtelierComponent', () => {
  let component: LoginAtelierComponent;
  let fixture: ComponentFixture<LoginAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAtelierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
