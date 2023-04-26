import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenReportComponent } from './open-report.component';

describe('OpenReportComponent', () => {
  let component: OpenReportComponent;
  let fixture: ComponentFixture<OpenReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
