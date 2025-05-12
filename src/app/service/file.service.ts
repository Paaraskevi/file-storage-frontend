import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFile } from '../file';
import { environment } from '../../environments/environment';


@Injectable({ providedIn:'root'})

export class FileService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public uploadFile(file: File): Observable<AppFile> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    
    return this.http.post<AppFile>(`${this.apiServerUrl}/file/upload`, formData);
  }

  public getFiles(): Observable<AppFile[]> {
    return this.http.get<AppFile[]>(`${this.apiServerUrl}/file/all`);
  }

  public deleteFile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/file/delete/${id}`);
  }

  public getFile(filename: string): Observable<AppFile> {
    return this.http.get<AppFile>(`${this.apiServerUrl}/file/${filename}`);
  }

  uploadFileAsJson(file: File): Observable<AppFile> {
    return new Observable((observer) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
  
        const filePayload = {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          base64Data: base64String
        };
  
        this.http.post<AppFile>('http://localhost:8080/file/upload-json', filePayload)
          .subscribe({
            next: (response) => observer.next(response),
            error: (error) => observer.error(error),
            complete: () => observer.complete()
          });
      };
  
      reader.onerror = (err) => {
        observer.error(err);
      };
  
      reader.readAsDataURL(file); 
    });
  }

  downloadFile(fileName: string): Observable<Blob> {
    const url = `http://localhost:8080/file/download/${encodeURIComponent(fileName)}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  
}