import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class DataTableComponent<T = any> implements OnInit, OnChanges, AfterViewInit {
  @Input() displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  @Input() data: T[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() showAddButton: boolean = false;
  @Input() addButtonLabel: string = 'Add New';
  @Input() noDataMessage: string = 'No data matching the filter';

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  dataSource: MatTableDataSource<T>;
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<T>();
  }

  ngOnInit() {
    console.log('DataTable initialized with data:', this.data);
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('DataTable changes:', changes);
    if (changes['data']) {
      console.log('Data changed:', this.data);
      this.initializeDataSource();
    }
  }

  ngAfterViewInit() {
    console.log('DataTable view initialized');
    // Set up the sort and paginator after the view is initialized
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private initializeDataSource() {
    if (!this.data) {
      console.log('No data available for initialization');
      return;
    }

    console.log('Initializing data source with:', this.data);
    this.dataSource = new MatTableDataSource<T>(this.data);
    
    // Configure custom sorting
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      console.log('Sorting by property:', property, 'for item:', item);
      switch (property) {
        case 'status':
          return Array.isArray(item.status) ? item.status.join(', ') : item.status;
        case 'name':
          return item.name?.toLowerCase() || '';
        case 'username':
          return item.username?.toLowerCase() || '';
        case 'description':
          return item.description?.toLowerCase() || '';
        case 'url':
          return item.url?.toLowerCase() || '';
        default:
          return item[property];
      }
    };

    // Configure filter predicate
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchStr = filter.toLowerCase();
      return Object.keys(data).some(key => {
        if (key === 'status') {
          return Array.isArray(data[key]) && 
                 data[key].some((status: string) => status.toLowerCase().includes(searchStr));
        }
        return String(data[key]).toLowerCase().includes(searchStr);
      });
    };

    // Set up the sort and paginator if they are available
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdd() {
    this.add.emit();
  }

  onEdit(item: T) {
    this.edit.emit(item);
  }

  onDelete(item: T) {
    this.delete.emit(item);
  }
} 