import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule} from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-layout',
  imports: [
    MaterialModule, 
    RouterOutlet,
    RouterLink, 
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterLinkActive
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  menus: Menu[];

  private menuService = inject(MenuService);
  private loginService = inject(LoginService);

  ngOnInit(): void {
    this.menuService.getMenuChanges().subscribe(data => this.menus = data);
  }

  logout(){
      this.loginService.logout()
    }

}
