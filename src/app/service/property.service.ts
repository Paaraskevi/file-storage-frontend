import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../property';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/json';
  
  constructor(private http: HttpClient) { }

  uploadJsonFile(file: File): Observable<Property> {
    const formData = new FormData();
    formData.append('property', file); 
    return this.http.post<Property>(`${this.apiUrl}/upload-file`, formData);
  }
  
  saveProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/upload`, property);
  }
  
  uploadFormData(formData: FormData): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/upload-file`, formData);
  }
    
  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/records`);
  }
  
  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/records/${id}`);
  }
  
  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/records/${id}`);
  }
}