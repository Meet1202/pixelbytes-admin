import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SubscriptionComponent} from "./subscription.component";
import {ManageSubscriptionComponent} from './manage-subscription/manage-subscription.component';
import {TranslateModule} from "@ngx-translate/core";
import {PBFormsModule} from "../../../components/pb-forms.module";
import {AgGridModule} from "ag-grid-angular";
import {ButtonRendererComponent} from "../../../components/renderers/button-renderer";
import {TooltipModule} from "ng2-tooltip-directive";
import {AppModule} from "../../app.module";

const routes: Routes = [
  {path: '', component: SubscriptionComponent},
  {path: 'manage', component: ManageSubscriptionComponent},
  {path: 'manage/:userId', component: ManageSubscriptionComponent}
]

@NgModule({
  declarations: [
    SubscriptionComponent,
    ManageSubscriptionComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
    PBFormsModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    TooltipModule
  ]
})
export class SubscriptionModule {
}
