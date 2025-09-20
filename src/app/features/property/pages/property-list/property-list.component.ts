import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../../../core/services/property/property.service';
import { PropertyFiltersComponent } from '../../components/property-filters/property-filters.component';
import { Property, PropertyFilters } from '../../interfaces/property.interface';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PropertyFiltersComponent],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  loading = true;
  error: string | null = null;
  currentFilters: PropertyFilters = {};

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadProperties();
  }

  onFiltersChange(filters: PropertyFilters) {
    this.currentFilters = filters;
    this.loadProperties();
  }

  loadProperties() {
    this.loading = true;
    this.error = null;

    this.propertyService.getProperties(this.currentFilters).subscribe({
      next: (response) => {
        this.properties = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.error = 'No se pudieron cargar las propiedades. Verifica que el backend esté corriendo.';
        this.loading = false;
        this.properties = [];
      }
    });
  }

  retryLoad() {
    this.loadProperties();
  }
}
