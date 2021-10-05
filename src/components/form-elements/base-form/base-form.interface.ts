import {FormControl} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';

export interface BaseFormInterface<T> {
  value?: T;
  controls?: FormControl;
  fieldName?: string;
  required?: boolean;
  order?: number;
  controlType?: string;
  type?: string;
  options?: Array<any>;
  labelClass?: string;
  placeholder?: string;
  inputClass?: string;
  displayLabel?: string;
  disabled?: boolean;
  maxHeight?: number;
  col?: number;
  selectSettings?: SelectSettingsInterface<any>;
  isMultiple?: boolean;
  autoCompleteSettings?: AutoCompleteSettingsInterface<any>;
  apiUrl?: string;
  apiFieldName?: string;
  setValidation?: any;
  validators?: any;
  clearValidation?: any;
  showThumb?: boolean;
  editorSettings?: AngularEditorConfig;
  uiComponentName?: any;
  fieldSize?: string;
  isMultipleFieldUpload?: boolean;
}

export interface SelectSettingsInterface<T> {
  enableSearch?: boolean;
  searchPlaceholder?: string;
  noDataFoundPlaceholder?: string;
  showSelectedItemsAtTop?: boolean;
  allowRemoteDataSearch?: boolean;
  multipleSelectedText?: string;
}

export interface AutoCompleteSettingsInterface<T> {
  getSelectedTagTemplate?: any;
  afterPlaceholder?: string;
}

