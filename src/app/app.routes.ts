import { Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileListComponent } from './file-list/file-list.component';
export const routes: Routes = [
    { path: '', component: FileUploadComponent },
    { path: 'files', component: FileListComponent },
  ];