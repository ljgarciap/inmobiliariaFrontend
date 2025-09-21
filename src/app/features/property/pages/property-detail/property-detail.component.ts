import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../../core/services/property/property.service';
import { Property } from '../../interfaces/property.interface';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property: Property | null = null;
  loading = true;

  // Configuración del mapa
  mapOptions: google.maps.MapOptions = {
    center: { lat: 4.135, lng: -73.635 },
    zoom: 12
  };
  markerPosition: google.maps.LatLngLiteral | null = null;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProperty(+id);
    }
  }

  loadProperty(id: number) {
    this.propertyService.getPropertyById(id).subscribe({
      next: (response) => {
        this.property = response.data;

        // Configurar mapa si hay coordenadas (convertir strings a números)
        if (this.property?.latitud && this.property?.longitud) {
          this.setMapLocation(
            this.parseCoordinate(this.property.latitud),
            this.parseCoordinate(this.property.longitud)
          );
        } else if (this.property?.ciudad) {
          this.geocodeCity(this.property.ciudad);
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading property:', error);
        this.loading = false;
      }
    });
  }

  // Función para convertir coordenadas (strings o números) a números
  private parseCoordinate(coord: any): number {
    if (coord === null || coord === undefined) {
      return NaN;
    }

    // Si es string, convertir a número
    if (typeof coord === 'string') {
      const num = parseFloat(coord);
      return isNaN(num) ? NaN : num;
    }

    // Si ya es número, verificar que sea finito
    return typeof coord === 'number' && isFinite(coord) ? coord : NaN;
  }

  setMapLocation(lat: number, lng: number) {
    // Verificar que las coordenadas sean números válidos
    if (isNaN(lat) || isNaN(lng)) {
      console.error('Coordenadas inválidas:', lat, lng);
      return;
    }

    this.mapOptions = {
      center: { lat, lng },
      zoom: 14,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };
    this.markerPosition = { lat, lng };
  }

  geocodeCity(city: string) {
    const cityCoordinates: { [key: string]: { lat: number, lng: number } } = {
      'Bucaramanga': { lat: 7.1193, lng: -73.1227 },
      'Floridablanca': { lat: 7.0622, lng: -73.0864 },
      'Girón': { lat: 7.0734, lng: -73.1688 },
      'Piedecuesta': { lat: 7.0794, lng: -73.0494 },
      'San Gil': { lat: 6.5557, lng: -73.1331 }
    };

    if (cityCoordinates[city]) {
      this.setMapLocation(cityCoordinates[city].lat, cityCoordinates[city].lng);
    } else {
      // Coordenadas de Colombia
      this.setMapLocation(4.135, -73.635);
    }
  }

  hasValidCoordinates(): boolean {
    if (!this.markerPosition) return false;
    return !isNaN(this.markerPosition.lat) && !isNaN(this.markerPosition.lng);
  }
}
