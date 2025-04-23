import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterCardComponent } from './filter-card.component';

describe('FilterCardComponent', () => {
  let component: FilterCardComponent;
  let fixture: any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FilterCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCardComponent);
    component = fixture.componentInstance;
    component.title = 'Test Title';
    component.value = 123;
    component.route = '/test-route';
    component.filters = { foo: 'bar', baz: [1, 2, 3] };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate with correct route and query params when calling navigate method', async() => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve());
    await component.navigate();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/test-route'], { queryParams: { foo: 'bar,baz:1,2,3' } });
  });

  it('should clear local storage when navigating to /bank', async() => {
    const router = TestBed.inject(Router);
    spyOn(localStorage, 'removeItem');
    await component.navigate();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('ag-grid-persistent-filtering-bank');
  });

  it('should clear local storage when navigating to /premiums', async() => {
    const router = TestBed.inject(Router);
    spyOn(localStorage, 'removeItem');
    await component.navigate();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('ag-grid-persistent-filtering-premiums');
  });
});
