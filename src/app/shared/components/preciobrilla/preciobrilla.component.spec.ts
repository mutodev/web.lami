import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciobrillaComponent } from './preciobrilla.component';

describe('PreciobrillaComponent', () => {
  let component: PreciobrillaComponent;
  let fixture: ComponentFixture<PreciobrillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreciobrillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreciobrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
