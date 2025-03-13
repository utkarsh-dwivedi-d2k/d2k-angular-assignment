import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomerceCarComponent } from './ecomerce-car.component';

describe('EcomerceCarComponent', () => {
  let component: EcomerceCarComponent;
  let fixture: ComponentFixture<EcomerceCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcomerceCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcomerceCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
