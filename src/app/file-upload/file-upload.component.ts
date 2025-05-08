import { Component } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  getAllFiles() {
    throw new Error('Method not implemented.');
  }
  selectedFile: File | null = null;
  shortLink: string = '';
  loading: boolean = false;
  uploadMessage: string = '';
  uploadError: string = '';
  router: any;
  constructor(private fileUploadService: FileUploadService) { }

  onChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onUpload(): void {
    if (this.selectedFile) {
      this.loading = true;
      this.uploadMessage = '';
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          this.shortLink = response.shortLink;
          this.uploadMessage = 'File uploaded successfully!';
          this.loading = false;
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.loading = false;
          this.uploadMessage = 'Failed to upload file.';
        }
      );
    }
  }
  learFile(): void {
    this.selectedFile = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  viewFiles(): void {
    this.router.navigate(['/files']);
  }
}
