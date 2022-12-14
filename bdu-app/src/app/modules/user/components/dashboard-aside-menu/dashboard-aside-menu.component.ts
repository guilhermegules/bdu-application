import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-aside-menu',
  templateUrl: './dashboard-aside-menu.component.html',
  styleUrls: ['./dashboard-aside-menu.component.scss'],
})
export class DashboardAsideMenuComponent {
  @Input()
  public accountNumber!: string;
}
