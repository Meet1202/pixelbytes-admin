import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from "./categories.component";
import { ImageListingComponent } from './image-listing/image_listing.component';
import { CategoryComponent } from './category/category.component';
import {RouterModule, Routes} from "@angular/router";
import {PBFormsModule} from "../../../components/pb-forms.module";
import {TranslateModule} from "@ngx-translate/core";
import {AgGridModule} from "ag-grid-angular";
import {ButtonRendererComponent} from "../../../components/renderers/button-renderer";
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ManageImageListingComponent } from './manage-image-listing/manage-image-listing.component';
import {TagInputModule} from "ngx-chips";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {path: 'menu', component: ImageListingComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'sub-category', component: SubCategoryComponent},
]

@NgModule({
  declarations: [
    CategoriesComponent,
    ImageListingComponent,
    CategoryComponent,
    SubCategoryComponent,
    ManageImageListingComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PBFormsModule,
        TranslateModule,
        AgGridModule.withComponents([ButtonRendererComponent]),
        TagInputModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CategoryModule { }
