import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '@core/services/local-storage.service';
import { USER_KEY } from '@modules/user/constants/local-storage.constants';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatButtonModule],
})
export class MainNavComponent {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  public onLogout() {
    this.router.navigate(['/']);
    this.localStorageService.removeItem(USER_KEY);
  }
}
