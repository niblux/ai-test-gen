import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-card.component.html',
  styleUrl: './filter-card.component.scss'
})
export class FilterCardComponent {
  @Input() title: string;

  @Input() value: number;

  @Input() route: string;

  @Input() filters: any;

  constructor(private router: Router) {}

  navigate() {
    const queryParams = Object.entries(this.filters).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value.join(',') : value;
      return acc;
    }, {});

    this.router.navigate([this.route], { queryParams }).then(() => {
      // Clear local storage based on the route
      if (this.route === '/bank') {
        localStorage.removeItem('ag-grid-persistent-filtering-bank');
      } else if (this.route === '/premiums') {
        localStorage.removeItem('ag-grid-persistent-filtering-premiums');
      }
    });
  }
}
