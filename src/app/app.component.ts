import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountListComponent } from './components/account-list/account-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AccountListComponent
  ],
  template: `
    <app-account-list></app-account-list>
  `,
  styles: []
})
export class AppComponent {
  title = 'my-crud-app';
} 