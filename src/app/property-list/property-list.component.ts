import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Property } from '../property';
import { PropertyService } from '../service/property.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  properties: Property[] = [];
  loading = false;
  errorMessage = '';
  private propertyAddedSubscription?: Subscription;

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.loadProperties();
    
    this.propertyAddedSubscription = new Subscription();
    window.addEventListener('property-added', () => this.loadProperties());
  }

  ngOnDestroy() {
    if (this.propertyAddedSubscription) {
      this.propertyAddedSubscription.unsubscribe();
    }
    window.removeEventListener('property-added', () => this.loadProperties());
  }

  loadProperties() {
    this.loading = true;
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.errorMessage = 'Failed to load properties. Please try again.';
        this.loading = false;
      }
    });
  }

  deleteProperty(id: number) {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.properties = this.properties.filter(property => property.id !== id);
        },
        error: (error) => {
          console.error('Error deleting property:', error);
          this.errorMessage = 'Failed to delete property. Please try again.';
        }
      });
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}