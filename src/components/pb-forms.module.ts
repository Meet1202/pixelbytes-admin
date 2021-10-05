import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {HttpClientModule} from '@angular/common/http';
import {FormGeneratorComponent} from './form-elements/form-generator/form-generator.component';
import { PBButtonComponent } from './form-elements/pb-button/pb-button.component';
import { PBEditorComponent } from './form-elements/pb-editor/pb-editor.component';
import { PBCheckboxComponent } from './form-elements/pb-checkbox/pb-checkbox.component';
import { PBInputTextComponent } from './form-elements/pb-input-text/pb-input-text.component';
import { PBTextareaComponent } from './form-elements/pb-textarea/pb-textarea.component';
import { PBSelectBoxComponent } from './form-elements/pb-select-box/pb-select-box.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {PBLoaderComponent} from './pb-loader/pb-loader.component';
import {NbButtonModule, NbInputModule, NbSelectModule, NbTooltipDirective, NbTooltipModule} from "@nebular/theme";
import { PBConfirmPromptComponent } from './form-elements/pb-confirm-prompt/pb-confirm-prompt.component';
import {AgGridModule} from "ag-grid-angular";
import {ButtonRendererComponent} from "./renderers/button-renderer";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import {TooltipRendererComponent} from "./renderers/tooltip-renderer";
import {SafeHtmlPipe} from "./pipe/safeHtml.pipe";
import {DropDownRenderer} from "./renderers/drop-down-renderer";

const COMPONENTS = [
  FormGeneratorComponent,
  PBButtonComponent,
  PBEditorComponent,
  PBCheckboxComponent,
  PBInputTextComponent,
  PBTextareaComponent,
  PBSelectBoxComponent,
  PBLoaderComponent,
  PBConfirmPromptComponent,
  TooltipRendererComponent,
  DropDownRenderer,
  SafeHtmlPipe
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    TooltipModule,
    AgGridModule.withComponents([ButtonRendererComponent, TooltipRendererComponent, DropDownRenderer]),
  ],
  declarations: [ COMPONENTS ],
  exports: [ COMPONENTS ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PBFormsModule {}
