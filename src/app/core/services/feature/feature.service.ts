import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Feature {
  id: number;
  nombre: string;
  icono?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFeatures(): Observable<{ data: Feature[] }> {
    return this.http.get<{ data: Feature[] }>(`${this.baseUrl}/caracteristicas`);
  }
}
