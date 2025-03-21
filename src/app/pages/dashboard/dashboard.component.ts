import { Component } from '@angular/core';
import { ButtonPluxComponent } from "../button-plux/button-plux.component";

@Component({
  selector: 'app-dashboard',
  imports: [ButtonPluxComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
