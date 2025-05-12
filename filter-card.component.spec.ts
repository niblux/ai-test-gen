import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FilterCardComponent } from './filter-card.component';
import { Router } from '@angular/router';

describe('FilterCardComponent', () => {
  let component: FilterCardComponent;
  let fixture: ComponentFixture<FilterCardComponent>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterCardComponent],
      providers: [
        { provide: Router, useFactory: () => router }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCardComponent);
    component = fixture.componentInstance;
    router = jest.fn(() => ({ navigate: jasmine.createSpy() }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigate method when clicking the card', () => {
    const queryParams = { filter1: 'value1' };
    component.filters = queryParams;
    fixture.detectChanges();
    component.navigate();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith([component.route], { queryParams });
  });

  it('should clear local storage based on the route', () => {
    const route = '/bank';
    component.route = route;
    component.navigate();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('ag-grid-persistent-filtering-bank');
  });

  it('should not clear local storage if route is not /bank or /premiums', () => {
    const route = '/other';
    component.route = route;
    component.navigate();
    expect(localStorage.removeItem).not.toHaveBeenCalled();
  });
});