import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Property, PropertyApiResponse, PropertyFilters } from '../../../features/property/interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProperties(filters?: PropertyFilters): Observable<PropertyApiResponse> {
  let params = new HttpParams();

  if (filters) {
    Object.keys(filters).forEach(key => {
      const value = filters[key as keyof PropertyFilters];

      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params = params.set(key, value.join(','));
          }
        } else {
          const stringValue = String(value);
          if (stringValue !== 'undefined' && stringValue !== 'null') {
            params = params.set(key, stringValue);
          }
        }
      }
    });
  }
  console.log('Params enviados:', params.toString());
  return this.http.get<PropertyApiResponse>(`${this.baseUrl}/propiedades`, { params });
  }

  getPropertyById(id: number): Observable<{ data: Property }> {
    return this.http.get<{ data: Property }>(`${this.baseUrl}/propiedades/${id}`);
  }

  createProperty(propertyData: FormData): Observable<{ data: Property }> {
    return this.http.post<{ data: Property }>(`${this.baseUrl}/propiedades`, propertyData);
  }

  updateProperty(id: number, propertyData: any): Observable<{ data: Property }> {
    return this.http.put<{ data: Property }>(`${this.baseUrl}/propiedades/${id}`, propertyData);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/propiedades/${id}`);
  }

  addPropertyImages(id: number, images: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/propiedades/${id}/imagenes`, images);
  }
}
