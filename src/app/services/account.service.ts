import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Account } from '../models/account.model';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:9010/api/accounts';
  private accountsSignal = signal<Account[]>([]);
  private selectedAccountSignal = signal<Account | null>(null);

  // Dependency injection
  private http = inject(HttpClient);
  private appState = inject(AppStateService);

  // Read-only signals
  readonly accounts = this.accountsSignal.asReadonly();
  readonly selectedAccount = this.selectedAccountSignal.asReadonly();

  // Computed signals
  readonly hasAccounts = computed(() => this.accountsSignal().length > 0);
  readonly activeAccounts = computed(() => 
    this.accountsSignal().filter(account => account.status.includes('active'))
  );

  async loadAccounts(): Promise<void> {
    try {
      console.log('AccountService: Starting to load accounts...');
      this.appState.setLoading(true);
      console.log('AccountService: Making HTTP request to', this.apiUrl);
      const accounts = await firstValueFrom(this.http.get<Account[]>(this.apiUrl));
      console.log('AccountService: Received accounts from API:', accounts);
      this.accountsSignal.set(accounts || []);
      console.log('AccountService: Updated accounts signal with', this.accountsSignal());
    } catch (error) {
      console.error('AccountService: Failed to load accounts:', error);
      this.appState.setError('Failed to load accounts');
      throw error;
    } finally {
      console.log('AccountService: Finished loading accounts');
      this.appState.setLoading(false);
    }
  }

  async getAccount(id: string): Promise<Account> {
    try {
      this.appState.setLoading(true);
      const account = await firstValueFrom(this.http.get<Account>(`${this.apiUrl}/${id}`)) || {} as Account;
      this.selectedAccountSignal.set(account);
      return account;
    } catch (error) {
      console.error('Failed to get account:', error);
      this.appState.setError('Failed to get account');
      throw error;
    } finally {
      this.appState.setLoading(false);
    }
  }

  async createAccount(account: Account): Promise<Account> {
    try {
      this.appState.setLoading(true);
      const newAccount = await firstValueFrom(this.http.post<Account>(this.apiUrl, account)) || {} as Account;
      this.accountsSignal.update(accounts => [...accounts, newAccount]);
      this.appState.setSuccess('Account created successfully');
      return newAccount;
    } catch (error) {
      console.error('Failed to create account:', error);
      this.appState.setError('Failed to create account');
      throw error;
    } finally {
      this.appState.setLoading(false);
    }
  }

  async updateAccount(id: string, account: Account): Promise<Account> {
    try {
      this.appState.setLoading(true);
      const updatedAccount = await firstValueFrom(this.http.put<Account>(`${this.apiUrl}/${id}`, account)) || {} as Account;
      this.accountsSignal.update(accounts => 
        accounts.map(acc => acc._id === id ? updatedAccount : acc)
      );
      if (this.selectedAccountSignal()?._id === id) {
        this.selectedAccountSignal.set(updatedAccount);
      }
      this.appState.setSuccess('Account updated successfully');
      return updatedAccount;
    } catch (error) {
      console.error('Failed to update account:', error);
      this.appState.setError('Failed to update account');
      throw error;
    } finally {
      this.appState.setLoading(false);
    }
  }

  async deleteAccount(id: string): Promise<void> {
    try {
      this.appState.setLoading(true);
      await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
      this.accountsSignal.update(accounts => 
        accounts.filter(acc => acc._id !== id)
      );
      if (this.selectedAccountSignal()?._id === id) {
        this.selectedAccountSignal.set(null);
      }
      this.appState.setSuccess('Account deleted successfully');
    } catch (error) {
      console.error('Failed to delete account:', error);
      this.appState.setError('Failed to delete account');
      throw error;
    } finally {
      this.appState.setLoading(false);
    }
  }

  selectAccount(account: Account | null): void {
    this.selectedAccountSignal.set(account);
  }

  clearSelection(): void {
    this.selectedAccountSignal.set(null);
  }
} 