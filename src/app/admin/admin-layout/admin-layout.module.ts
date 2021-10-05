import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminLayoutComponent} from "./admin-layout.component";
import { NavbarComponent } from './navbar/navbar.component';
import {ThemeModule} from "../../@theme/theme.module";
import {NbIconModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule} from "@nebular/theme";
import {NgxPopperModule} from "ngx-popper";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent
  ],
  exports: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NgxPopperModule,
    NbSelectModule,
    NbIconModule,
    TranslateModule
  ]
})
export class AdminLayoutModule { }
