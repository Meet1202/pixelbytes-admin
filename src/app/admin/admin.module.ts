import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AdminComponent } from './admin.component';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import {AdminLayoutModule} from "./admin-layout/admin-layout.module";
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import {CategoryModule} from "./categories/category.module";
import { EnquiryComponent } from './enquiry/enquiry.component';
import { UserComponent } from './user/user.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import {PBFormsModule} from "../../components/pb-forms.module";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from "@angular/common/http";
import {ButtonRendererComponent} from "../../components/renderers/button-renderer";
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    AdminLayoutModule,
    CategoryModule,
    PBFormsModule,
    FormsModule,
    TranslateModule,
    HttpClientModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    // DashboardModule,
    // ECommerceModule,
    // MiscellaneousModule,
  ],
  declarations: [
    AdminComponent,
    HomeComponent,
    EnquiryComponent,
    ContactComponent,
    ProfileComponent,
    ButtonRendererComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminModule {
}
