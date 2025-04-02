import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-container">
      <h1 class="title">SpaceX Mission Launch List</h1>
      
      <div class="filters">
        <div class="filter-group">
          <label>Launch Date</label>
          <select [(ngModel)]="selectedYear" (change)="onFilterChange()">
            <option value="">All Years</option>
            <option *ngFor="let year of years" [value]="year">{{ year }}</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Launch Status</label>
          <select [(ngModel)]="launchSuccess" (change)="onFilterChange()">
            <option value="">All Launches</option>
            <option value="true">Successful</option>
            <option value="false">Failed</option>
          </select>
        </div>

        <button class="reset-button" (click)="resetFilters()">Reset Filters</button>
      </div>
    </div>
  `,
  styles: [`
    .filter-container {
      background-color: #f5f5f5;
      padding: 20px;
      margin-bottom: 20px;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      margin: 0 0 20px 0;
      color: #333;
    }

    .filters {
      display: flex;
      gap: 15px;
      align-items: flex-end;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      font-weight: 500;
      color: #333;
    }

    select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      min-width: 150px;
      font-size: 14px;
    }

    .reset-button {
      padding: 8px 16px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      height: 35px;
    }

    .reset-button:hover {
      background-color: #d32f2f;
    }
  `]
})
export class MissionfilterComponent {
  years: string[] = [
    '2006', '2007', '2008', '2009', '2010',
    '2011', '2012', '2013', '2014', '2015',
    '2016', '2017', '2018', '2019', '2020'
  ];

  selectedYear: string = '';
  launchSuccess: string = '';

  @Output() filterChange = new EventEmitter<{
    year: string | null;
    launchSuccess: boolean | null;
  }>();

  onFilterChange() {
    this.filterChange.emit({
      year: this.selectedYear || null,
      launchSuccess: this.launchSuccess === '' ? null : this.launchSuccess === 'true'
    });
  }

  resetFilters() {
    this.selectedYear = '';
    this.launchSuccess = '';
    this.onFilterChange();
  }
}
