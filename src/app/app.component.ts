import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import feather from 'feather-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
}
