import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {HomeComponent} from "./home/home.component";
import {EnquiryComponent} from "./enquiry/enquiry.component";
import {UserComponent} from "./user/user.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {ContactComponent} from "./contact/contact.component";
import {ProfileComponent} from "./profile/profile.component";
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'categories',
      loadChildren: () => import('./categories/category.module')
        .then(m => m.CategoryModule),
    },
    {
      path: 'enquiry',
      component: EnquiryComponent
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
    },
    {
      path: 'subscription',
      loadChildren: () => import('./subscription/subscription.module')
        .then(m => m.SubscriptionModule),
    },
    {
      path: 'contact',
      component: ContactComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
          path: '',
          loadChildren:
            './admin-layout/admin-layout.module#AdminLayoutModule'
        }
      ]
    },
    {
      path: '**',
      // component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
