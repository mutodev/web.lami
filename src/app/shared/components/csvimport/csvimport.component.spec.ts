import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvimportComponent } from './csvimport.component';

describe('CsvimportComponent', () => {
  let component: CsvimportComponent;
  let fixture: ComponentFixture<CsvimportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvimportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
