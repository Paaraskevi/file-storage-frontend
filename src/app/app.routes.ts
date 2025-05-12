import { Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileListComponent } from './file-list/file-list.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { JsonUploadComponent } from './json-upload/json-upload.component';
export const routes: Routes = [
    { path: '', component: FileUploadComponent },
    { path: 'files', component: FileListComponent },
    { path: 'json-upload', component: JsonUploadComponent },
    {path : 'property-list', component: PropertyListComponent},
    
  ]