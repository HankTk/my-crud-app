import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DataItem {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api'; // バックエンドのAPIエンドポイントに合わせて変更してください

  constructor(private http: HttpClient) { }

  getData(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(`${this.apiUrl}/items`);
  }

  getItem(id: number): Observable<DataItem> {
    return this.http.get<DataItem>(`${this.apiUrl}/items/${id}`);
  }

  createItem(item: Omit<DataItem, 'id'>): Observable<DataItem> {
    return this.http.post<DataItem>(`${this.apiUrl}/items`, item);
  }

  updateItem(id: number, item: DataItem): Observable<DataItem> {
    return this.http.put<DataItem>(`${this.apiUrl}/items/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${id}`);
  }
} 