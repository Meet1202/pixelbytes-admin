import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbMenuService, NbSidebarService, NbThemeService} from "@nebular/theme";
import {LayoutService} from "../../../@core/utils";
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../../../services/shared-service/shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('popperContentRef', {static: false}) popperContentRef: any;

  themes = [
    {
      value: 'default',
      name: this.translate.instant('COMMON.LABEL.LIGHT'),
    },
    {
      value: 'dark',
      name: this.translate.instant('COMMON.LABEL.DARK'),
    },
    {
      value: 'cosmic',
      name: this.translate.instant('COMMON.LABEL.COSMIC'),
    },
    {
      value: 'corporate',
      name: this.translate.instant('COMMON.LABEL.CORPORATE'),
    },
  ];

  currentTheme = 'default';
  companyName = 'Pixel Bytes';
  userName = 'Meet Shah'

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private translate: TranslateService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.sharedService.productName.subscribe((data: any) => {
      this.companyName = data;
    });
  }

  ngOnInit(): void {
    this.currentTheme = localStorage.getItem('theme');
    this.themeService.changeTheme(this.currentTheme);
  }

  ngOnDestroy() {
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    localStorage.setItem('theme', themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout(event) {
    this.router.navigate(['/admin/signin']);
    localStorage.removeItem('loggedIn');
  }

}
