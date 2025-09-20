import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../../../core/services/property/property.service';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-list.component.html', // ← Template separado
  styleUrls: ['./property-list.component.scss'] // ← Styles separado
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  loading = true;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe({
      next: (response) => {
        this.properties = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.loading = false;
      }
    });
  }
}
