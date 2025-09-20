import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyFilters } from '../../interfaces/property.interface';

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-filters.component.html',
  styleUrls: ['./property-filters.component.scss']
})
export class PropertyFiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<PropertyFilters>();

  filters: PropertyFilters = {};

  // Opciones para los selects
  cities = [
    { id: 1, name: 'Bucaramanga' },
    { id: 2, name: 'Floridablanca' },
    { id: 3, name: 'Girón' },
    { id: 4, name: 'Piedecuesta' },
    { id: 5, name: 'San Gil' }
  ];

  transactionTypes = [
    { value: 'venta', label: 'Venta' },
    { value: 'arriendo', label: 'Arriendo' }
  ];

  bedroomsOptions = [1, 2, 3, 4, 5];
  selectedBedrooms: number[] = [];

  features = [
    { id: 1, name: 'Piscina' },
    { id: 2, name: 'Ascensor' },
    { id: 3, name: 'Parqueadero' },
    { id: 4, name: 'Zona Verde' }
  ];
  selectedFeatures: number[] = [];

  ngOnInit() {
    this.applyFilters();
  }

  onBedroomChange(bedroom: number, event: any) {
    if (event.target.checked) {
      this.selectedBedrooms.push(bedroom);
    } else {
      this.selectedBedrooms = this.selectedBedrooms.filter(b => b !== bedroom);
    }
    this.filters.habitaciones = this.selectedBedrooms;
    this.applyFilters();
  }

  onFeatureChange(featureId: number, event: any) {
    if (event.target.checked) {
      this.selectedFeatures.push(featureId);
    } else {
      this.selectedFeatures = this.selectedFeatures.filter(id => id !== featureId);
    }
    this.filters.caracteristicas = this.selectedFeatures;
    this.applyFilters();
  }

  applyFilters() {
  const cleanedFilters: { [key: string]: string | number | number[] } = {};

  Object.keys(this.filters).forEach(key => {
    const value = this.filters[key as keyof PropertyFilters];

    if (value !== undefined && value !== null && value !== '' &&
        value !== 'Todas las ciudades' && value !== 'Todos los tipos') {
      cleanedFilters[key] = value;
    }
  });

  this.filtersChange.emit(cleanedFilters as PropertyFilters);
  }

  clearFilters() {
    this.filters = {};
    this.selectedBedrooms = [];
    this.selectedFeatures = [];
    this.applyFilters();
  }
}
