import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkovComponent } from './markov.component';

describe('MarkovComponent', () => {
  let component: MarkovComponent;
  let fixture: ComponentFixture<MarkovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
