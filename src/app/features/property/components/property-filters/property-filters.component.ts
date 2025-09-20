import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyFilters } from '../../interfaces/property.interface';
import { CityService } from '../../../../core/services/city/city.service';
import { FeatureService } from '../../../../core/services/feature/feature.service';
import { City } from '../../../../core/services/city/city.service';
import { Feature } from '../../../../core/services/feature/feature.service';

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CityService, FeatureService],
  templateUrl: './property-filters.component.html',
  styleUrls: ['./property-filters.component.scss']
})
export class PropertyFiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<PropertyFilters>();

  filters: PropertyFilters = {};

  cities: City[] = [];
  features: Feature[] = [];

  // Opciones fijas
  transactionTypes = [
    { value: 'venta', label: 'Venta' },
    { value: 'arriendo', label: 'Arriendo' }
  ];

  bedroomsOptions: (number | string)[] = [1, 2, 3, '4+'];
  selectedBedrooms: number[] = [];
  selectedFeatures: number[] = [];

  constructor(
    private cityService: CityService,
    private featureService: FeatureService
  ) {}

  ngOnInit() {
    this.loadCities();
    this.loadFeatures();
    this.applyFilters();
  }

  loadCities() {
    this.cityService.getCities().subscribe({
      next: (response: { data: City[]; }) => {
        this.cities = response.data;
      },
      error: (error: any) => {
        console.error('Error loading cities:', error);
        this.cities = [
          { id: 1, nombre: 'Bucaramanga' },
          { id: 2, nombre: 'Floridablanca' },
          { id: 3, nombre: 'Girón' },
          { id: 4, nombre: 'Piedecuesta' },
          { id: 5, nombre: 'San Gil' }
        ];
      }
    });
  }

  loadFeatures() {
    this.featureService.getFeatures().subscribe({
      next: (response: { data: Feature[]; }) => {
        this.features = response.data;
      },
      error: (error: any) => {
        console.error('Error loading features:', error);
        this.features = [
          { id: 1, nombre: 'Piscina', icono: 'pool' },
          { id: 2, nombre: 'Ascensor', icono: 'elevator' },
          { id: 3, nombre: 'Parqueadero', icono: 'parking' },
          { id: 4, nombre: 'Gimnasio', icono: 'gym' }
        ];
      }
    });
  }

  onBedroomChange(option: number | string, event: any) {
    if (event.target.checked) {
      if (option === '4+') {
        // Agregar 4, 5, 6, etc. (ajustar rango)
        this.selectedBedrooms = [...this.selectedBedrooms, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      } else {
        this.selectedBedrooms.push(option as number);
      }
    } else {
      if (option === '4+') {
        this.selectedBedrooms = this.selectedBedrooms.filter(b => b < 4);
      } else {
        this.selectedBedrooms = this.selectedBedrooms.filter(b => b !== option);
      }
    }

    this.selectedBedrooms = [...new Set(this.selectedBedrooms)].sort();
    this.filters.habitaciones = this.selectedBedrooms;
    this.applyFilters();
  }

  isBedroomSelected(option: number | string): boolean {
    if (option === '4+') {
      return this.selectedBedrooms.some(b => b >= 4);
    } else {
      return this.selectedBedrooms.includes(option as number);
    }
  }

  getBedroomLabel(option: number | string): string {
    if (option === '4+') {
      return '4 o más habitaciones';
    } else {
      return `${option} ${option === 1 ? 'habitación' : 'habitaciones'}`;
    }
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
