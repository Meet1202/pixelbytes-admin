import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from "./categories.component";
import { MenuComponent } from './menu/menu.component';
import { CategoryComponent } from './category/category.component';
import {RouterModule, Routes} from "@angular/router";
import {PBFormsModule} from "../../../components/pb-forms.module";
import {TranslateModule} from "@ngx-translate/core";
import {AgGridModule} from "ag-grid-angular";
import {ButtonRendererComponent} from "../../../components/renderers/button-renderer";
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {path: 'menu', component: MenuComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'sub-category', component: SubCategoryComponent},
]

@NgModule({
  declarations: [
    CategoriesComponent,
    MenuComponent,
    CategoryComponent,
    SubCategoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PBFormsModule,
    TranslateModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CategoryModule { }
