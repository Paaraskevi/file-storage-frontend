import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PropertyService } from '../service/property.service';
import { Property } from '../property';

@Component({
  selector: 'app-json-upload',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './json-upload.component.html',
  styleUrl: './json-upload.component.css'
})
export class JsonUploadComponent {
  propertyForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  submissionSuccess = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {
    this.propertyForm = this.fb.group({
      address: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      propertyType: ['', [Validators.required]],
      bedrooms: [null, [Validators.required, Validators.min(0)]],
      bathrooms: [null, [Validators.required, Validators.min(0)]],
      squareFeet: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    if (this.selectedFile) {
      this.propertyForm.reset();
    }
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.submissionSuccess = false;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      this.propertyService.uploadFormData(formData).subscribe({
        next: (response) => {
          this.handleSuccess();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else if (this.propertyForm.valid) {
      const propertyData: Property = this.propertyForm.value;
      
      this.propertyService.saveProperty(propertyData).subscribe({
        next: (response) => {
          this.handleSuccess();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.isSubmitting = false;
      this.errorMessage = 'Please provide either a valid JSON file or fill out the form correctly.';
    }
  }

  private handleSuccess(): void {
    this.isSubmitting = false;
    this.submissionSuccess = true;
    this.propertyForm.reset();
    this.selectedFile = null;
    const fileInput = document.getElementById('jsonFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    // Emit an event to refresh the property list
    window.dispatchEvent(new CustomEvent('property-added'));
  }

  private handleError(error: any): void {
    this.isSubmitting = false;
    this.errorMessage = error.message || 'An error occurred while saving the property.';
    console.error('Error submitting property:', error);
  }

  clearFile(): void {
    this.selectedFile = null;
    const fileInput = document.getElementById('jsonFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  resetForm(): void {
    this.propertyForm.reset();
    this.clearFile();
    this.errorMessage = '';
  }
  getErrorMessage(controlName: string): string {
    const control = this.propertyForm.get(controlName);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }
    
    if (control.errors['required']) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    
    if (control.errors['min']) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be greater than or equal to ${control.errors['min'].min}`;
    }
    
    if (control.errors['max']) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be less than or equal to ${control.errors['max'].max}`;
    }
    
    if (control.errors['minlength']) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    
    return 'Invalid value';
  }
}