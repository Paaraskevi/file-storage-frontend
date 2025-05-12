import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppFile } from '../file'
import { FileService } from '../service/file.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-file-list',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent {
  appFile: AppFile[] = [];
  selectedFile: File | null = null;

  constructor(private fileUploadService: FileService) { }

  ngOnInit() {
    this.getFiles();
  }

  public getFiles(): void {
    this.fileUploadService.getFiles().subscribe(
      (response: AppFile[]) => {
        this.appFile = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  deleteFile(id: number): void {
    if (confirm('Are you sure you want to delete this file?')) {
      this.fileUploadService.deleteFile(id).subscribe(
        () => {
          this.appFile = this.appFile.filter(file => file.id !== id);
        },
        (error) => {
          console.error('Error deleting file:', error);
        }
      );
    }
  }

  clearFile(): void {
    this.selectedFile = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
  downloadFile(filename: string) {
    this.fileUploadService.downloadFile(filename).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      },
      error: (error) => {
        console.error('Download failed', error);
        alert('File download failed');
      }
    });
  }
}
