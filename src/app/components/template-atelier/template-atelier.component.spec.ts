import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAtelierComponent } from './template-atelier.component';

describe('TemplateAtelierComponent', () => {
  let component: TemplateAtelierComponent;
  let fixture: ComponentFixture<TemplateAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAtelierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
