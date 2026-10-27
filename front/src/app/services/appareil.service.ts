import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appareil {
  _id: string;
  name: string;
  status: 'On' | 'Off';
}

@Injectable({ providedIn: 'root' })
export class AppareilService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3001/api/appareils';

  list(status?: 'On' | 'Off'): Observable<Appareil[]> {
    const url = status ? `${this.baseUrl}?status=${status}` : this.baseUrl;
    return this.http.get<Appareil[]>(url);
  }

  getById(id: string): Observable<Appareil> {
    return this.http.get<Appareil>(`${this.baseUrl}/${id}`);
  }

  create(name: string, status: 'On' | 'Off' = 'Off'): Observable<Appareil> {
    return this.http.post<Appareil>(this.baseUrl, { name, status });
  }

  update(id: string, patch: Partial<Pick<Appareil, 'name' | 'status'>>): Observable<Appareil> {
    return this.http.put<Appareil>(`${this.baseUrl}/${id}`, patch);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  switchOn(id: string): Observable<Appareil> {
    return this.update(id, { status: 'On' });
  }

  switchOff(id: string): Observable<Appareil> {
    return this.update(id, { status: 'Off' });
  }

  switchAll(status: 'On' | 'Off'): Observable<unknown> {
    return this.http.patch(`${this.baseUrl}/switch-all`, { status });
  }
}