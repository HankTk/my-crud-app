import { Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountListComponent }
]; 