import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Property, PropertyFilters } from '../../../features/property/interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends ApiService {
  private readonly endpoint = 'propiedades';

  getProperties(filters?: PropertyFilters): Observable<{ data: Property[] }> {
    return this.get<{ data: Property[] }>(this.endpoint, filters);
  }

  getPropertyById(id: number): Observable<{ data: Property }> {
    return this.get<{ data: Property }>(`${this.endpoint}/${id}`);
  }

  createProperty(propertyData: FormData): Observable<{ data: Property }> {
    return this.postFormData<{ data: Property }>(this.endpoint, propertyData);
  }

  updateProperty(id: number, propertyData: any): Observable<{ data: Property }> {
    return this.put<{ data: Property }>(`${this.endpoint}/${id}`, propertyData);
  }

  deleteProperty(id: number): Observable<any> {
    return this.delete(`${this.endpoint}/${id}`);
  }

  addPropertyImages(id: number, images: FormData): Observable<any> {
    return this.postFormData(`${this.endpoint}/${id}/imagenes`, images);
  }
}
