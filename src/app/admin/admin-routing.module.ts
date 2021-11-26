import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {HomeComponent} from "./home/home.component";
import {EnquiryComponent} from "./enquiry/enquiry.component";
import {ContactComponent} from "./contact/contact.component";
import {ProfileComponent} from "./profile/profile.component";
import {SigninComponent} from "./signin/signin.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
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
      // {
      //   path: '**',
      //   component: NotFoundComponent,
      // },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
