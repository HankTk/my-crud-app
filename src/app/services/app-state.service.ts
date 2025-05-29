import { Injectable, signal, computed } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

    // アプリケーションの状態を管理するSignal
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private successSignal = signal<string | null>(null);

  // 読み取り専用のSignal
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly success = this.successSignal.asReadonly();

  // 計算されたSignal
  readonly hasError = computed(() => this.errorSignal() !== null);
  readonly hasSuccess = computed(() => this.successSignal() !== null);

  // 状態を更新するメソッド
  setLoading(loading: boolean): void {
    this.loadingSignal.set(loading);
  }

  setError(message: string | null): void {
    this.errorSignal.set(message);
    if (message) {
      // 3秒後にエラーメッセージをクリア
      setTimeout(() => this.errorSignal.set(null), 3000);
    }
  }

  setSuccess(message: string | null): void {
    this.successSignal.set(message);
    if (message) {
      // 3秒後に成功メッセージをクリア
      setTimeout(() => this.successSignal.set(null), 3000);
    }
  }

  clearMessages(): void {
    this.errorSignal.set(null);
    this.successSignal.set(null);
  }

} 