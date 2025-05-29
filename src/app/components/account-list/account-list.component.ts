import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account.service';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { Account } from '../../models/account.model';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  private accountService = inject(AccountService);
  private appState = inject(AppStateService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  accounts: Account[] = [];
  isLoading = false;
  error: string | null = null;
  displayedColumns = ['name', 'username', 'description', 'url', 'status', 'actions'];

  constructor() {
    console.log('AccountListComponent: Constructor called');
  }

  ngOnInit() {
    console.log('AccountListComponent: ngOnInit called');
    this.loadAccounts();
  }

  async loadAccounts() {
    console.log('AccountListComponent: Starting to load accounts');
    try {
      this.isLoading = true;
      this.error = null;
      console.log('AccountListComponent: Calling AccountService.loadAccounts()');
      await this.accountService.loadAccounts();
      this.accounts = this.accountService.accounts();
      console.log('AccountListComponent: Accounts loaded successfully:', this.accounts);
    } catch (error) {
      console.error('AccountListComponent: Error loading accounts:', error);
      this.error = 'Failed to load accounts';
    } finally {
      this.isLoading = false;
      console.log('AccountListComponent: Finished loading accounts');
    }
  }

  openAccountDialog(account?: Account) {
    console.log('AccountListComponent: Opening account dialog', account);
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      autoFocus: true,
      disableClose: false,
      data: account || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('AccountListComponent: Dialog closed with result:', result);
        this.loadAccounts();
      }
    });
  }

  async deleteAccount(account: Account) {
    console.log('AccountListComponent: Deleting account:', account);
    if (confirm(`Are you sure you want to delete ${account.name}?`)) {
      try {
        if (account._id) {
          await this.accountService.deleteAccount(account._id);
          this.snackBar.open('Account deleted successfully', 'Close', { duration: 3000 });
          this.loadAccounts();
        }
      } catch (error) {
        this.snackBar.open('Error deleting account', 'Close', { duration: 3000 });
        console.error('AccountListComponent: Error deleting account:', error);
      }
    }
  }
} 