import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface City {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCities(): Observable<{ data: City[] }> {
    return this.http.get<{ data: City[] }>(`${this.baseUrl}/ciudades`);
  }
}
