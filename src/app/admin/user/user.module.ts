import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {PBFormsModule} from "../../../components/pb-forms.module";
import {TranslateModule} from "@ngx-translate/core";
import {AgGridModule} from "ag-grid-angular";
import {ButtonRendererComponent} from "../../../components/renderers/button-renderer";
import {TooltipDirective, TooltipModule} from "ng2-tooltip-directive";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TooltipRendererComponent} from "../../../components/renderers/tooltip-renderer";
import { LogoViewerComponent } from './logo-viewer/logo-viewer.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {NbCheckboxModule, NbSelectModule} from "@nebular/theme";

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'manage', component: ManageUserComponent},
  {path: 'manage/:userId', component: ManageUserComponent},
  {path: 'detail/:userId', component: UserDetailsComponent}
]

@NgModule({
  declarations: [UserComponent, LogoViewerComponent, ManageUserComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PBFormsModule,
    TranslateModule,
    TooltipModule,
    NgbModule,
    NbSelectModule,
    NbCheckboxModule,
    AgGridModule.withComponents([ButtonRendererComponent, TooltipRendererComponent]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UserModule { }
