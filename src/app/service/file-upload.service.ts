import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppFile } from '../file';
const baseApiUrl = environment.apiBaseUrl;
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<AppFile[]> {
    return this.http.get<AppFile[]>('http://localhost:8080/file/all');
  }
  getFile(filename: string): Observable<AppFile> {
    return this.http.get<AppFile>(`http://localhost:8080/file/${filename}`);
  }
  deleteFile(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/file/delete/${id}`);
  }
  uploadFile(file: File): Observable<AppFile> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post<AppFile>(`${baseApiUrl}/file/upload`, formData);
  }
}
