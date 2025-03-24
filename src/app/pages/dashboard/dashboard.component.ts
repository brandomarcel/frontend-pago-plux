import { Component } from '@angular/core';
import { ButtonPluxComponent } from "../button-plux/button-plux.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonPluxComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  transaccionData: any = '';

  manejarTransaccion(data: any) {
    this.transaccionData = data;
  }


}
