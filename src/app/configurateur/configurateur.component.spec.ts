import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurateurComponent } from './configurateur.component';

describe('ConfigurateurComponent', () => {
  let component: ConfigurateurComponent;
  let fixture: ComponentFixture<ConfigurateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
